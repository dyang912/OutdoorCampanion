import { getDatabase, ref, child,get, orderByChild } from "firebase/database";

const db = getDatabase();

export async function fetch_posts() {
    return await get(child(ref(db), `posts`, orderByChild('time'))).then((snapshot) => {
        const postarray = [];
        snapshot.forEach(function(child) {
            console.log(child.val());
            postarray.push(child.val());
        });
        if (snapshot.exists()) {
            return postarray;
        }
    }).catch((error) => {
        console.error(error);
    });
}
