import { noteConstants } from '../../constants/noteConstants';
import { notesServices } from '../../services/notesServices';

export const notesAction = {
	getNoteCategories,
	getNotes,
	setSortBy,
	setCurrentSelectedNoteCategoryIndex,
};

function getNoteCategories() {
	return dispatch => {
		return notesServices
			.getNoteCategories()
			.then(categoriesList => {
				dispatch(setNotesCategoriesListActionCreator(categoriesList));
			})
			.catch(err => {
				console.log(err);
				setNotesCategoriesListActionCreator([['Task', 'Todo']]);
			});
	};

	function setNotesCategoriesListActionCreator(payload) {
		return { type: noteConstants.SET_NOTES_CATAGORIES, payload };
	}
}


function getNotes() {
	return dispatch => {
		return notesServices
			.getNotes()
			.then(notes => {
				dispatch(setNoteActionCreator(notes));
			})
			.catch(err => {
				console.log(err);
			});
	};

	function setNoteActionCreator(payload) {
		return { type: noteConstants.SET_ALL_NOTES, payload };
	}
}

function setSortBy(payload){
	return {type:noteConstants.SET_SORT_ON_PARAMETER,payload}
}
function setCurrentSelectedNoteCategoryIndex(payload){
		return {type:noteConstants.SET_CURRENT_SELECTED_NOTE_CATEGORY_INDEX,payload}
}
