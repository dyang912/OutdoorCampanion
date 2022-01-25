import {getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import {firebase} from './firebase'
import {useState, useEffect} from "react";

export const signInWithGoogle = async () => {
    return await signInWithPopup(getAuth(firebase), new GoogleAuthProvider()).then(
        (result) => {
            return [result.user.email, result.user.displayName, result.user.photoURL];
        }
    )
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = ({setUEmail, setUName, setUPhotoUrl}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const auth = getAuth(firebase);
        onIdTokenChanged(auth, setUser);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("get state")
                setUEmail(user.email)
                setUName(user.displayName)
                setUPhotoUrl(user.photoURL)
            } else {
            }
        })
    }, []);

    return [user];
};