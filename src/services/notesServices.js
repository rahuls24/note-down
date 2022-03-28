import firebaseConfig from '../configs/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
export const notesServices = {
	saveNoteCategory,
	getNoteCategories,
	getNotes,
	saveNote,
	updateNote,
	updateNoteCategory,
	deleteAllCompletedNotes,
	test,
};

async function saveNoteCategory(payload) {
	let data = null;
	try {
		const currentCategoryRef = firebaseConfig.createDocRef(
			'app/users',
			`${firebaseConfig.auth.currentUser.uid}/categories`,
		);
		await firebaseConfig.updateDoc(currentCategoryRef, {
			notesCatagories: firebaseConfig.arrayUnion(payload),
		});
		return data;
	} catch (error) {
		throw new Error(error);
	}
}
async function getNoteCategories() {
	try {
		const currentCategoryRef = firebaseConfig.createDocRef(
			'app/users',
			`${firebaseConfig.auth.currentUser.uid}/categories`,
		);
		const docSnap = await firebaseConfig.getDoc(currentCategoryRef);

		if (docSnap.exists() && docSnap.data().notesCatagories) {
			localStorage.setItem(
				`${firebaseConfig.auth.currentUser.uid}notesCatagories`,
				JSON.stringify(docSnap.data().notesCatagories),
			);
			return docSnap.data().notesCatagories;
		} else {
			throw new Error(
				'Something went wrong while getting all notes catagories from firebase',
			);
		}
	} catch (error) {
		throw new Error(error);
	}
}

async function updateNoteCategory(currentNoteCategory, updatedNoteCategory) {
	let data = null;
	try {
		const currentCategoryRef = firebaseConfig.createDocRef(
			'app/users',
			`${firebaseConfig.auth.currentUser.uid}/categories`,
		);
		if (!updatedNoteCategory) {
			await firebaseConfig.updateDoc(currentCategoryRef, {
				notesCatagories:
					firebaseConfig.arrayRemove(currentNoteCategory),
			});
			return;
		}
		await Promise.all([
			firebaseConfig.updateDoc(currentCategoryRef, {
				notesCatagories: firebaseConfig.arrayUnion(updatedNoteCategory),
			}),
			firebaseConfig.updateDoc(currentCategoryRef, {
				notesCatagories:
					firebaseConfig.arrayRemove(currentNoteCategory),
			}),
		]);
		return data;
	} catch (error) {
		throw new Error(error);
	}
}

async function saveNote(payload) {
	let data = null;
	try {
		const noteRef = firebaseConfig.createDocRef(
			'app/users',
			`${firebaseConfig.auth.currentUser.uid}/notes`,
		);
		await firebaseConfig.updateDoc(noteRef, {
			notes: firebaseConfig.arrayUnion(payload),
		});
		return data;
	} catch (error) {
		throw new Error(error);
	}
}

async function getNotes() {
	try {
		const noteRef = firebaseConfig.createDocRef(
			'app/users',
			`${firebaseConfig.auth.currentUser.uid}/notes`,
		);
		const docSnap = await firebaseConfig.getDoc(noteRef);

		if (docSnap.exists() && docSnap.data().notes) {
			localStorage.setItem(
				`${firebaseConfig.auth.currentUser.uid}notes`,
				JSON.stringify(docSnap.data().notes),
			);
			return docSnap.data().notes;
		} else {
			throw new Error(
				'Something went wrong while getting all notes catagories from firebase',
			);
		}
	} catch (error) {
		throw new Error(error);
	}
}

async function updateNote(currentNote, updatedNote) {
	if (updatedNote) updatedNote['id'] = uuidv4();
	let data = null;
	try {
		const noteRef = firebaseConfig.createDocRef(
			'app/users',
			`${firebaseConfig.auth.currentUser.uid}/notes`,
		);
		if (!updatedNote) {
			await firebaseConfig.updateDoc(noteRef, {
				notes: firebaseConfig.arrayRemove(currentNote),
			});
			return;
		}
		await Promise.all([
			firebaseConfig.updateDoc(noteRef, {
				notes: firebaseConfig.arrayUnion(updatedNote),
			}),
			firebaseConfig.updateDoc(noteRef, {
				notes: firebaseConfig.arrayRemove(currentNote),
			}),
		]);
		return data;
	} catch (error) {
		throw new Error(error);
	}
}

async function deleteAllCompletedNotes(allCompletedNotes) {
	const noteRef = firebaseConfig.createDocRef(
		'app/users',
		`${firebaseConfig.auth.currentUser.uid}/notes`,
	);
	await Promise.all(
		allCompletedNotes.map(item =>
			firebaseConfig.updateDoc(noteRef, {
				notes: firebaseConfig.arrayRemove(item),
			}),
		),
	);
}

async function test () {
	try {
		const currentCategoryRef = firebaseConfig.createDocRef(
			'app/users',
			`0k3L6HtN3qZ6PKg9uZRMvmoDAcS2d/categories`,
		);
		const docSnap = await firebaseConfig.getDoc(currentCategoryRef);
		console.log(docSnap ,docSnap.exists())
		// if (docSnap.exists() && docSnap.data().notesCatagories) {
		// 	console.log(docSnap.data())
		// 	// return docSnap.data().notesCatagories;
		// } else {
		// 	throw new Error(
		// 		'Something went wrong while getting all notes catagories from firebase',
		// 	);
		// }
	} catch (error) {
		throw new Error(error);
	}
}