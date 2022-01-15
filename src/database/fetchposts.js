import { getDatabase, ref, child,get, orderByChild } from "firebase/database";

const db = getDatabase();

export async function fetch_posts() {
    return await get(child(ref(db), `posts`, orderByChild('time'))).then((snapshot) => {
        snapshot.forEach(function(child) {
            console.log(child.val()) // NOW THE CHILDREN PRINT IN ORDER
        });
        // if (snapshot.exists()) {
        //     return snapshot.val()
        // }
    }).catch((error) => {
        console.error(error);
    });
}
