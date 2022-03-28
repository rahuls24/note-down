// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	browserLocalPersistence,
	setPersistence,
	updateProfile,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import {
	doc,
	updateDoc,
	arrayUnion,
	getDoc,
	getFirestore,
	setDoc,
	onSnapshot,
	arrayRemove,
	enableIndexedDbPersistence,
	collection,
	query,
	where,
} from 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyDEUTQW4zmU3p9rppLsyZ4Mfkr7ORz7cW8',
	authDomain: 'node-down.firebaseapp.com',
	projectId: 'node-down',
	storageBucket: 'node-down.appspot.com',
	messagingSenderId: '724313825417',
	appId: '1:724313825417:web:dd7c10ddbb39ab6afd6658',
	measurementId: 'G-TNZL959ECV',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

class FirebaseConfig {
	constructor() {
		this.app = initializeApp(firebaseConfig);
		this.auth = getAuth(this.app);
		this.db = getFirestore(this.app);
		this.googleProvider = new GoogleAuthProvider();
		enableIndexedDbPersistence(this.db).catch(err => {
			if (err.code === 'failed-precondition') {
				console.log(
					'Multiple tabs open, persistence can only be enabled in one tab at a a time.',
				);
			} else if (err.code === 'unimplemented') {
				console.log(
					'The current browser does not support all of the features required to enable persistence',
				);
			}
		});
	}
	//Auth Related
	createUserWithEmailAndPassword(email, password) {
		return createUserWithEmailAndPassword(this.auth, email, password);
	}
	signInWithEmailAndPassword(email, password) {
		return signInWithEmailAndPassword(this.auth, email, password);
	}
	setPersistenceLocalStorage() {
		return setPersistence(this.auth, browserLocalPersistence);
	}
	signOut() {
		return signOut(this.auth);
	}
	updateProfile(payload) {
		return updateProfile(this.auth.currentUser, payload);
	}
	isInitialized() {
		return new Promise(resolve => {
			onAuthStateChanged(this.auth, resolve);
		});
	}
	// Related to Firestore
	createDocRef(path, pathSegments) {
		return doc(this.db, path, pathSegments);
	}
	setDoc(docRef, data) {
		return setDoc(docRef, data);
	}
	getDoc(docRef) {
		return getDoc(docRef);
	}
	onSnapshot(docRef, cb) {
		return onSnapshot(docRef, cb);
	}
	arrayUnion(data) {
		return arrayUnion(data);
	}
	arrayRemove(data) {
		return arrayRemove(data);
	}
	updateDoc(docRef, data) {
		return updateDoc(docRef, data);
	}
	signInWithGooglePopup() {
		return signInWithPopup(this.auth, this.googleProvider);
	}
	test() {
		const citiesRef = collection(this.db, "app/users/0k3L6HtN3qZ6PKg9uZRMvmoDAcS2/");
		console.log("citiesRef",citiesRef)
		const q = query(citiesRef,where("state", "==", "CA"));
		console.log(q)

	}
}
export default new FirebaseConfig();
