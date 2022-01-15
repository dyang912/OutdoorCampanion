import { getDatabase, ref, child,get, orderByChild, limitToLast } from "firebase/database";

const db = getDatabase();

export async function fetch_posts() {
    return await get(child(ref(db), `posts`, orderByChild('time'), limitToLast(3))).then((snapshot) => {
        const postarray = [];
        snapshot.forEach(function(child) {
            postarray.push(child.val());
        });
        console.log(postarray);
        if (snapshot.exists()) {
            postarray.sort((a, b) => b.time - a.time);
            return postarray;
        }
    }).catch((error) => {
        console.error(error);
    });
}
