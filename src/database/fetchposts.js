import { getDatabase, ref, child, set, get } from "firebase/database";

const db = getDatabase();

export async function fetch_posts() {
    return await get(child(ref(db), `posts`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        }
    }).catch((error) => {
        console.error(error);
    });
}
