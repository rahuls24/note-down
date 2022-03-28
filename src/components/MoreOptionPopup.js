import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { noteConstants } from '../constants/noteConstants';
import SortByPopup from './SortByPopup';
import { connect } from 'react-redux';
import { notesAction } from '../store/actions/notesAction';
function shouldDisableListButton(option, currentActiveNoteCategory = '') {
	if (
		option === noteConstants.DELETE_CATEGORY &&
		(currentActiveNoteCategory?.toLowerCase() === 'task' ||
			currentActiveNoteCategory?.toLowerCase() === 'todo')
	)
		return true;

	return false;
}
function MoreOptionPopup(props) {
	const {
		open,
		setOpen,
		onCloseHandler,
		setSortBy,
		currentActiveNoteCategory,
	} = props;
	const [shouldShowSortByPopup, setSortByPopupState] = useState(false);
	const onCloseHandlerHelper = selectedType => {
		setOpen(false);
		onCloseHandler(selectedType);
	};
	const sortByPopupOnCloseHandler = sortOn => {
		setSortBy(sortOn);
		onCloseHandler();
	};
	const list = () => (
		<Box sx={{ width: 'auto' }} role='presentation'>
			<List>
				<ListItem
					button
					key={'sortBy'}
					onClick={() => setSortByPopupState(true)}
				>
					<ListItemText primary={'Sort By'} />
				</ListItem>
			</List>
			<Divider />
			<List>
				{[
					noteConstants.RENAMED_CATEGORY,
					noteConstants.DELETE_CATEGORY,
					noteConstants.DELETE_ALL_COMPLETED_NOTES,
				]?.map((text, index) => (
					<ListItem
						button
						key={text}
						onClick={() => onCloseHandlerHelper(text)}
						disabled={shouldDisableListButton(
							text,
							currentActiveNoteCategory,
						)}
					>
						<ListItemText
							primary={text}
							secondary={
								shouldDisableListButton(
									text,
									currentActiveNoteCategory,
								)
									? `Default category can't be deleted`
									: null
							}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<>
			<Drawer
				anchor='bottom'
				open={open}
				onClose={() => onCloseHandlerHelper()}
				PaperProps={{ style: { maxHeight: '40vh' } }}
			>
				{list()}
			</Drawer>
			<SortByPopup
				open={shouldShowSortByPopup}
				setOpen={setSortByPopupState}
				onCloseHandler={sortByPopupOnCloseHandler}
			/>
		</>
	);
}
function mapToState(state) {
	const { notesReducers } = state;
	const { notesCatagoriesList, currentSelectedNoteCategoryIndex } =
		notesReducers;
	const currentActiveNoteCategory =
		notesCatagoriesList[currentSelectedNoteCategoryIndex]?.name;
	return {
		currentActiveNoteCategory,
	};
}
const mapToDispatch = {
	setSortBy: notesAction.setSortBy,
};
export default connect(mapToState, mapToDispatch)(MoreOptionPopup);

MoreOptionPopup.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	setSortBy: PropTypes.func.isRequired,
	onCloseHandler: PropTypes.func.isRequired,
	currentActiveNoteCategory: PropTypes.any,
};
