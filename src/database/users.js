import {getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import {firebase} from './firebase'
import {useState, useEffect} from "react";
import {child, get, orderByChild, ref, set, remove} from "firebase/database";
import {db} from "./firebase";

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
                setUEmail(user.email)
                setUName(user.displayName)
                setUPhotoUrl(user.photoURL)
            } else {
            }
        })
    }, []);

    return [user];
};

export function make_user(UName, UEmail, setTotalLikes){
    if (!check_user_exists){
        console.log("user doesnt exist");
        const user= UEmail.replaceAll(".", "_");
        set(ref(db, 'users/' + user), {
        username: UName,
        user_email: UEmail,
        likes: 0

    }).then(() => {
        alert("user success!")
    }).catch((error) => {
        console.log(error);
    });

    }
    
  }
export async function check_user_likes(UEmail, setTotalLikes) {
    const user = UEmail.replaceAll(".", "_");
    const path = 'users';
    return await get(ref(db, path)).then((snapshot) => {
        snapshot.forEach((val) => {
            if (val.val().user_email == UEmail){ 
                setTotalLikes(val.val().likes);
             }
        });
    }).catch((error) => {
        console.error(error);
    });
}


export async function check_user_exists(UEmail) {
    const user = UEmail.replaceAll(".", "_");
    const path = 'users';
    return await get(ref(db, path)).then((snapshot) => {
        snapshot.forEach((val) => {
            if (val.val().user_email == UEmail){ 
                return true;
             }
        });
    }).catch((error) => {
        console.error(error);
    });
}


