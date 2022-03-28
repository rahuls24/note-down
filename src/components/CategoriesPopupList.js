import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notesAction } from '../store/actions/notesAction';
function CategoriesPopupList(props) {
	const {
		open,
		setOpen,
		onCloseHandler,
		notesCatagoriesList,
	} = props;
	const onCloseHandlerHelper = currentActiveCategoryIndex => {
		setOpen(false);
		if (currentActiveCategoryIndex!==undefined)
		onCloseHandler(currentActiveCategoryIndex);
	};
	const list = () => (
		<Box sx={{ width: 'auto' }} role='presentation'>
			<List>
				{notesCatagoriesList?.map((text, index) => (
					<ListItem
						button
						key={text?.id}
						onClick={() => onCloseHandlerHelper(index)}
					>
						<ListItemIcon>
							<AssignmentIcon />
						</ListItemIcon>
						<ListItemText primary={text.name} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem
					button
					key={'AddCategory'}
					onClick={() =>
						onCloseHandlerHelper(notesCatagoriesList.length)
					}
				>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary={'Add A Note'} />
				</ListItem>
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
		</>
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
export default connect(mapToState, mapToDispatch)(CategoriesPopupList);
CategoriesPopupList.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	notesCatagoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
	onCloseHandler: PropTypes.func.isRequired,
};
