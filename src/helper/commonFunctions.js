export function formatFirebaseErrorMessage(errorMsg = '') {
	if (errorMsg.includes('auth/weak-password'))
		return 'Password should be at least 6 characters';
	if (errorMsg.includes('auth/invalid-email')) return 'Email is not valid.';
	if (errorMsg.includes('auth/wrong-password')) return 'Enter Correct Password'
	if (errorMsg.includes('auth/email-already-in-use')) return 'This email is already register.'
	return 'Something went wrong';
}

export function isOffline() {
	if(navigator && navigator.onLine) return false
	return true
}
