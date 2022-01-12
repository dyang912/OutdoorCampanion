import {getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut} from 'firebase/auth';
import {firebase} from './firebase'
import {useState, useEffect} from "react";

export const signInWithGoogle = async () => {
    return await signInWithPopup(getAuth(firebase), new GoogleAuthProvider()).then(
        (result) => {
            return [result.user.email, result.user.displayName];
        }
    )
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        onIdTokenChanged(getAuth(firebase), setUser);
    }, []);

    return [user];
};