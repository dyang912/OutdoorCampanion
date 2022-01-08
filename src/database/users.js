import { getDatabase, ref, child, set, get } from "firebase/database";

const db = getDatabase();

export function add_user(uName, uPassword) {
    set(ref(db, 'users/' + uName), {
        password: uPassword,
    });
}

export async function verify_user(uName, uPassword) {
    return await get(child(ref(db), `users/${uName}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val().password === uPassword
        } else {
            return false
        }
    }).catch((error) => {
        console.error(error);
    });
}

