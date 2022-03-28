import { useState, useRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import AddNotePopup from './AddNotePopup';
import { styled } from '@mui/material/styles';
import CategoriesPopupList from './CategoriesPopupList';
import MoreOptionPopup from './MoreOptionPopup';
import { noteConstants } from '../constants/noteConstants';
import { connect } from 'react-redux';
import { notesAction } from '../store/actions/notesAction';
import AddCategoryPopup from './AddCategoryPopup';
import { notesServices } from '../services/notesServices';
import { v4 as uuidv4 } from 'uuid';
const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: rgba(0,0,0,0.6);
  &.Mui-selected {
    color: rgba(0,0,0,0.6);
  }
`);
function BottomTabList(props) {
	const {
		notesCatagoriesList,
		deleteAllCompletedNotesFromActiveCategory,
		currentSelectedNoteCategoryIndex,
		setCurrentSelectedNoteCategoryIndex,
	} = props;
	const [value, setValue] = useState(0);
	const ref = useRef(null);
	const [shouldShowAddNotePopup, setAddNotePopupStatus] = useState(false);
	const [shouldShowCategoriesPopupList, setCategoriesPopupListStatus] =
		useState(false);
	const [shouldShowMorePopupList, setMorePopupListStatus] = useState(false);
	const [shouldShowAddCategoryPopup, setAddCategoryPopupState] =
		useState(false);
	const [shouldTakeInitialValue, setShouldTakeInitialValue] = useState(true);
	const currentActiveCategory = useMemo(() => {
		return notesCatagoriesList[currentSelectedNoteCategoryIndex];
	}, [notesCatagoriesList, currentSelectedNoteCategoryIndex]);
	const onCloseHandlerForCategoriesPopupList = currentActiveCategoryIndex => {
		if (currentActiveCategoryIndex === notesCatagoriesList.length) {
			setShouldTakeInitialValue(false);
			setAddCategoryPopupState(true);
			return;
		}
		setCurrentSelectedNoteCategoryIndex(currentActiveCategoryIndex);
	};
	const onCloseHandlerForMorePopupList = selectedType => {
		switch (selectedType) {
			case noteConstants.RENAMED_CATEGORY:
				setAddCategoryPopupState(true);
				setShouldTakeInitialValue(true);
				break;
			case noteConstants.DELETE_CATEGORY:
				notesServices.updateNoteCategory(currentActiveCategory);
				setCurrentSelectedNoteCategoryIndex(0);
				break;
			case noteConstants.DELETE_ALL_COMPLETED_NOTES:
				deleteAllCompletedNotesFromActiveCategory();
				break;
			default:
				setMorePopupListStatus(false);
				break;
		}
	};
	const saveNoteHandler = async note => {
		const currentTime = new Date();
		const payload = {
			id: uuidv4(),
			title: note,
			category: notesCatagoriesList[currentSelectedNoteCategoryIndex]?.id,
			state: 'active',
			createdOn: currentTime,
			updatedOn: currentTime,
		};
		notesServices.saveNote(payload);
	};
	const addCategoryPopupOnCloseHandler = (isCanceled, updatedValue) => {
		setAddCategoryPopupState(false);
		let updatedCategory
		if (isCanceled) return;
		if (!shouldTakeInitialValue) {
			updatedCategory ={
				name:updatedValue,
				id:uuidv4()
			}
			notesServices.saveNoteCategory(updatedCategory);
			setCurrentSelectedNoteCategoryIndex(notesCatagoriesList?.length);
			return;
		}
		updatedCategory = {
			...currentActiveCategory,
			name:updatedValue
		}
		notesServices.updateNoteCategory(currentActiveCategory, updatedCategory);
		setCurrentSelectedNoteCategoryIndex(notesCatagoriesList?.length - 1);
	};
	return (
		<Box sx={{ pb: 7 }} ref={ref}>
			<Paper
				sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
				elevation={3}
			>
				<BottomNavigation
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					color='secondary'
				>
					<Tooltip
						title={value === 0 ? '' : 'Menu'}
						color='secondary'
					>
						<BottomNavigationAction
							label='Menu'
							icon={<MenuIcon color='secondary' />}
							onClick={() => setCategoriesPopupListStatus(true)}
						/>
					</Tooltip>
					<Tooltip title={value === 1 ? '' : 'Add'} color='secondary'>
						<BottomNavigationAction
							label='Add'
							icon={<AddIcon color='secondary' />}
							onClick={() => setAddNotePopupStatus(true)}
						/>
					</Tooltip>
					<Tooltip
						title={value === 2 ? '' : 'More'}
						color='secondary'
					>
						<BottomNavigationAction
							label='More'
							icon={<MoreIcon color='secondary' />}
							color='secondary'
							onClick={() => setMorePopupListStatus(true)}
						/>
					</Tooltip>
				</BottomNavigation>
			</Paper>
			<AddNotePopup
				open={shouldShowAddNotePopup}
				setOpen={setAddNotePopupStatus}
				saveNoteHandler={saveNoteHandler}
			/>
			<CategoriesPopupList
				open={shouldShowCategoriesPopupList}
				setOpen={setCategoriesPopupListStatus}
				onCloseHandler={onCloseHandlerForCategoriesPopupList}
			/>
			<MoreOptionPopup
				open={shouldShowMorePopupList}
				setOpen={setMorePopupListStatus}
				onCloseHandler={onCloseHandlerForMorePopupList}
			/>
			<AddCategoryPopup
				open={shouldShowAddCategoryPopup}
				addCategoryPopupHandler={addCategoryPopupOnCloseHandler}
				initialValues={currentActiveCategory?.name}
				shouldTakeInitialValue={shouldTakeInitialValue}
			/>
		</Box>
	);
}

function mapToState(state) {
	const { notesReducers } = state;
	const { notesCatagoriesList, currentSelectedNoteCategoryIndex } =
		notesReducers;
	return {
		notesCatagoriesList,
		currentSelectedNoteCategoryIndex,
	};
}
const mapToDispatch = {
	setCurrentSelectedNoteCategoryIndex:
		notesAction.setCurrentSelectedNoteCategoryIndex,
};
export default connect(mapToState, mapToDispatch)(BottomTabList);
BottomTabList.propType = {
	currentSelectedNoteCategoryIndex: PropTypes.number.isRequired,
	notesCatagoriesList: PropTypes.arrayOf(PropTypes.string).isRequired,
	setCurrentSelectedNoteCategoryIndex: PropTypes.func.isRequired,
	deleteAllCompletedNotesFromActiveCategory: PropTypes.func.isRequired,
};
