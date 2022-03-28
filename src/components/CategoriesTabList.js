import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import AddCategoryPopup from './AddCategoryPopup';
import { connect } from 'react-redux';
import { notesServices } from '../services/notesServices';
import { v4 as uuidv4 } from 'uuid';
import { notesAction } from '../store/actions/notesAction';
function CategoriesTabList(props) {
	const {
		notesCatagoriesList,
		currentSelectedNoteCategoryIndex,
		setCurrentSelectedNoteCategoryIndex,
	} = props;
	const [shouldShowAddCategoryPopup, setAddCategoryPopupState] =
		useState(false);
	const addCategoryPopupHandler = (isCancel, categoryName) => {
		setAddCategoryPopupState(false);
		if (isCancel) {
			currentActiveCategoryIndexHandler(null, 0);
			return;
		}
		const payload = {
			name: categoryName,
			id: uuidv4(),
		};
		notesServices.saveNoteCategory(payload);
		currentActiveCategoryIndexHandler(null, notesCatagoriesList.length);
	};
	const currentActiveCategoryIndexHandler = (event, newValue) => {
		setCurrentSelectedNoteCategoryIndex(newValue);
	};
	return (
		<Box>
			<Tabs
				value={currentSelectedNoteCategoryIndex}
				onChange={currentActiveCategoryIndexHandler}
				variant='scrollable'
				scrollButtons='auto'
				aria-label='scrollable auto tabs example'
				textColor='secondary'
				indicatorColor='secondary'
			>
				{notesCatagoriesList &&
					notesCatagoriesList.map(tab => {
						return <Tab label={tab.name} key={tab.id} />;
					})}
				<Tab
					icon={<AddIcon />}
					onClick={() => setAddCategoryPopupState(true)}
				/>
			</Tabs>
			<AddCategoryPopup
				open={shouldShowAddCategoryPopup}
				addCategoryPopupHandler={addCategoryPopupHandler}
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
export default connect(mapToState, mapToDispatch)(CategoriesTabList);
CategoriesTabList.propTypes = {
	currentSelectedNoteCategoryIndex: PropTypes.number.isRequired,
	setCurrentSelectedNoteCategoryIndex: PropTypes.func.isRequired,
	notesCatagoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
