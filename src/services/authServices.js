import firebaseConfig from '../configs/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
export const authServices = {
	registerUser,
	signinUser,
	signInWithGoogle,
	signOut,
};
async function registerUser(payload) {
	try {
		await firebaseConfig.setPersistenceLocalStorage();
		const newUser = await firebaseConfig.createUserWithEmailAndPassword(
			payload.email,
			payload.password,
		);
		if (!newUser) throw new Error('Something went wrong. Please try again');
		await firebaseConfig.updateProfile({
			displayName: payload.displayName,
		});
		const notesDocRef = firebaseConfig.createDocRef(
			'app/users',
			`${newUser.user.uid}/notes`,
		);
		const notesCatagoriesDocRef = firebaseConfig.createDocRef(
			'app/users',
			`${newUser.user.uid}/categories`,
		);
		const notesCatagoriesPayload = [
			{ name: 'Task', id: uuidv4() },
			{ name: 'Todo', id: uuidv4() },
		];
		await Promise.all([
			firebaseConfig.setDoc(notesCatagoriesDocRef, {
				notesCatagories: notesCatagoriesPayload,
			}),
			firebaseConfig.setDoc(notesDocRef, { notes: [] }),
		]);
		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
}

async function signinUser(payload) {
	try {
		await firebaseConfig.setPersistenceLocalStorage();
		const currentUser = await firebaseConfig.signInWithEmailAndPassword(
			payload.email,
			payload.password,
		);
		if (!currentUser)
			throw new Error('Something went wrong. Please try again');
		return currentUser;
	} catch (error) {
		throw new Error(error);
	}
}

async function signOut() {
	try {
		await firebaseConfig.signOut();
	} catch (error) {
		throw new Error('Something went wrong');
	}
}

async function signInWithGoogle() {
	try {
		await firebaseConfig.setPersistenceLocalStorage();
		const newUser = await firebaseConfig.signInWithGooglePopup();
		if (!newUser) throw new Error('Something went wrong. Please try again');
		const notesCatagoriesDocRef = firebaseConfig.createDocRef(
			'app/users',
			`${newUser.user.uid}/categories`,
		);
		const docSnap = await firebaseConfig.getDoc(notesCatagoriesDocRef);
		if (docSnap.exists() && docSnap.data().notesCatagories) {
			return newUser;
		}
		const notesDocRef = firebaseConfig.createDocRef(
			'app/users',
			`${newUser.user.uid}/notes`,
		);
		const notesCatagoriesPayload = [
			{ name: 'Task', id: uuidv4() },
			{ name: 'Todo', id: uuidv4() },
		];
		await Promise.all([
			firebaseConfig.setDoc(notesCatagoriesDocRef, {
				notesCatagories: notesCatagoriesPayload,
			}),
			firebaseConfig.setDoc(notesDocRef, { notes: [] }),
		]);
		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
}
