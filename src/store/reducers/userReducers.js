import { userConstants } from '../../constants/userConstants';
const initialState = {
	isLoggedIn: false,
	userData: null,
	isGuestUser: false,
	authErrorMsg : null,
};
export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case userConstants.SET_USER_LOGIN_STATUS:
			return {
				...state,
				isLoggedIn: action.payload,
			};
		case userConstants.SET_USER_DATA:
			return {
				...state,
				userData: action.payload,
			};
		case userConstants.SET_GUEST_USER_STATUS:
			return {
				...state,
				isGuestUser: action.payload,
			};
		case userConstants.SET_AUTH_ERROR_MSG:
			return {
				...state,
				authErrorMsg: action.payload,
			};
		case userConstants.SET_TO_INITIAL_STATE:
			return initialState;
		default:
			return state;
	}
}
