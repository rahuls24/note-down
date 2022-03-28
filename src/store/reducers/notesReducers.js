import { noteConstants } from '../../constants/noteConstants';

const initialState = {
	notesCatagoriesList: ['Task','Todo'],
	allNotes: [],
	currentSelectedNotes: null,
	lastDeletedNotes: null,
	sortBy:'updatedOn',
	currentSelectedNoteCategoryIndex:0
};

export default function notesReducers(state = initialState, action) {
	switch (action.type) {
		case noteConstants.SET_NOTES_CATAGORIES:
			return {
				...state,
				notesCatagoriesList: action.payload, 
			};
		case noteConstants.SET_ALL_NOTES:
			return {
				...state,
				allNotes: action.payload,
			};
		case noteConstants.SET_CURRENT_SELECTED_NOTE:
			return {
				...state,
				currentSelectedNotes: action.payload,
			};
		case noteConstants.SET_LAST_DELETE_NOTE:
			return {
				...state,
				lastDeletedNotes: action.payload,
			};
		case noteConstants.SET_SORT_ON_PARAMETER:
			return {
				...state,
				sortBy: action.payload,
			};
		case noteConstants.SET_CURRENT_SELECTED_NOTE_CATEGORY_INDEX:
			return {
				...state,
				currentSelectedNoteCategoryIndex: action.payload,
			};
		default:
			return state;
	}
}
