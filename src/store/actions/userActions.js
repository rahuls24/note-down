import { userConstants } from '../../constants/userConstants';
import { formatFirebaseErrorMessage } from '../../helper/commonFunctions';
import { authServices } from '../../services/authServices';
export const userActions = {
	registerUser,
	signinUser,
	guestUserLogin,
	setAuthErrorMsg,
	signOut,
	signinUserWithGoogle,
};

function registerUser(payload) {
	return dispatch => {
		return authServices
			.registerUser(payload)
			.then(newUser => {
				dispatch(saveUserActionCreator(newUser));
				dispatch(setLoginStatus(true));
			})
			.catch(err => {
				dispatch(saveUserActionCreator(null));
				dispatch(setLoginStatus(false));
				dispatch(setAuthErrorMsg(formatFirebaseErrorMessage(err.message)));
			});
	};
	function saveUserActionCreator(payload) {
		return { type: userConstants.SET_USER_DATA, payload };
	}
	function setLoginStatus(payload) {
		return { type: userConstants.SET_USER_LOGIN_STATUS, payload };
	}
}
function signinUser(payload) {
	return dispatch => {
		return authServices
			.signinUser(payload)
			.then(user => {
				dispatch(saveUserActionCreator(user));
				dispatch(setLoginStatus(true));
			})
			.catch(err => {
				dispatch(saveUserActionCreator(null));
				dispatch(setLoginStatus(false));
				dispatch(setAuthErrorMsg(formatFirebaseErrorMessage(err.message)));
			});
	};
	function saveUserActionCreator(payload) {
		return { type: userConstants.SET_USER_DATA, payload };
	}
	function setLoginStatus(payload) {
		return { type: userConstants.SET_USER_LOGIN_STATUS, payload };
	}
}

function guestUserLogin() {
	return { type: userConstants.SET_GUEST_USER_STATUS, payload: true };
}
function setAuthErrorMsg(payload) {
	return { type: userConstants.SET_AUTH_ERROR_MSG, payload };
}

function signOut(){
	return dispatch=>{
		return authServices.signOut().then(()=>{
			dispatch(setUserStateToInitialActionCreator())
		}).catch(err=>{
			console.log(err)
		})
	}
	function setUserStateToInitialActionCreator(){
		return {type: userConstants.SET_TO_INITIAL_STATE}
	}
}

function signinUserWithGoogle() {
	return dispatch => {
		return authServices
			.signInWithGoogle()
			.then(user => {
				dispatch(saveUserActionCreator(user));
				dispatch(setLoginStatus(true));
			})
			.catch(err => {
				dispatch(saveUserActionCreator(null));
				dispatch(setLoginStatus(false));
				dispatch(setAuthErrorMsg(formatFirebaseErrorMessage(err.message)));
			});
	};
	function saveUserActionCreator(payload) {
		return { type: userConstants.SET_USER_DATA, payload };
	}
	function setLoginStatus(payload) {
		return { type: userConstants.SET_USER_LOGIN_STATUS, payload };
	}
}