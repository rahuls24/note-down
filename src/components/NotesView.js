import { useEffect, useState, useCallback, Fragment } from 'react';
import { connect } from 'react-redux';
import firebaseConfig from '../configs/firebaseConfig';
import { notesAction } from '../store/actions/notesAction';
import BottomTabList from './BottomTabList';
import CategoriesTabList from './CategoriesTabList';
import NoteItemView from './NoteItemView';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import NoteCompletedAccordion from './common/NoteCompletedAccordion';
import NoNotesScreen from './NoNotesScreen';
import { notesServices } from '../services/notesServices';
import { sort } from 'fast-sort';
function filterNoteItemsByCategory(noteItemsList, categoryId) {
	return noteItemsList.filter(noteItem => noteItem.category === categoryId);
}
function filterNoteItemsByState(noteItemsList, state, categoryId, sortBy) {
	const notes = filterNoteItemsByCategory(noteItemsList, categoryId).filter(
		noteItem => noteItem.state === state,
	);
	switch (sortBy) {
		case 'title':
			return sort(notes).asc(note => note.title);
		case 'updatedOn':
			return sort(notes).desc(note => note.updatedOn);
		default:
			return sort(notes).asc(note => note.title);
	}
}

function NotesView(props) {
	const {
		notesCatagoriesList,
		getNoteCategories,
		getNotes,
		allNotes,
		sortBy,
		currentSelectedNoteCategoryIndex,
	} = props;
	const [currentActiveCategoryIndex, setCurrentActiveCategoryIndex] =
		useState(0);
	// This effect is handing the event listener of firestore database for update in categories list
	useEffect(() => {
		const docRef = firebaseConfig.createDocRef(
			'app/users',
			`${firebaseConfig.auth.currentUser.uid}/categories`,
		);
		const unSubscribeFromOnSnapshot = firebaseConfig.onSnapshot(
			docRef,
			getNoteCategories,
		);
		return () => unSubscribeFromOnSnapshot();
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);
	// This effect is handing the event listener of firestore database for update in notes list
	useEffect(() => {
		const noteDocRef = firebaseConfig.createDocRef(
			'app/users',
			`${firebaseConfig.auth.currentUser.uid}/notes`,
		);
		const unSubscribeFromOnSnapshotOfNotes = firebaseConfig.onSnapshot(
			noteDocRef,
			getNotes,
		);
		return () => unSubscribeFromOnSnapshotOfNotes();
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);
	const deleteAllCompletedNotesFromActiveCategory = async () => {
		const completedNotesList = filterNoteItemsByState(
			allNotes,
			'completed',
			notesCatagoriesList[currentSelectedNoteCategoryIndex]?.id,
		);
		await notesServices.deleteAllCompletedNotes(completedNotesList);
	};
	return (
		<>
			<CategoriesTabList />
			{filterNoteItemsByCategory(
				allNotes,
				notesCatagoriesList[currentSelectedNoteCategoryIndex]?.id,
			).length === 0 && <NoNotesScreen />}
			<List
				sx={{ marginTop: 1, paddingRight: '16px', paddingLeft: '16px' }}
			>
				{allNotes &&
					filterNoteItemsByState(
						allNotes,
						'active',
						notesCatagoriesList[currentSelectedNoteCategoryIndex]
							?.id,
						sortBy,
					).map((noteItem, index) => {
						let props = {
							labelId: `checkbox-list-label-${index}`,
							note: noteItem,
						};
						return (
							<Fragment key={noteItem?.id + 'key'}>
								<NoteItemView {...props} />
							</Fragment>
						);
					})}
			</List>
			{filterNoteItemsByState(
				allNotes,
				'completed',
				notesCatagoriesList[currentSelectedNoteCategoryIndex]?.id,
			)?.length > 0 && (
				<>
					<Divider />
					<NoteCompletedAccordion
						completedNotes={filterNoteItemsByState(
							allNotes,
							'completed',
							notesCatagoriesList[
								currentSelectedNoteCategoryIndex
							]?.id,
							sortBy,
						)}
					/>
				</>
			)}
			<BottomTabList
				deleteAllCompletedNotesFromActiveCategory={
					deleteAllCompletedNotesFromActiveCategory
				}
			/>
		</>
	);
}

function mapToState(state) {
	const { notesReducers } = state;
	const {
		notesCatagoriesList,
		allNotes,
		sortBy,
		currentSelectedNoteCategoryIndex,
	} = notesReducers;
	return {
		notesCatagoriesList,
		allNotes,
		sortBy,
		currentSelectedNoteCategoryIndex,
	};
}

const mapToDispatch = {
	getNoteCategories: notesAction.getNoteCategories,
	getNotes: notesAction.getNotes,
};

export default connect(mapToState, mapToDispatch)(NotesView);
NotesView.propType = {
	notesCatagoriesList: PropTypes.arrayOf(PropTypes.string).isRequired,
	getNoteCategories: PropTypes.func.isRequired,
	getNotes: PropTypes.func.isRequired,
	allNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
