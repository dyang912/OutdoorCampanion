import {child, get, getDatabase, onValue, orderByChild, ref, set} from "firebase/database";
import {db, firebase} from "./firebase";
import {getRandomInt} from "./utils";


export function add_post_comment(postKey, commentTxt) {
    const commentKey = getRandomInt();
    const path = 'posts/' + postKey + '/comments/' + commentKey;

    set(ref(db, path), {
        text: commentTxt,
        commentKey: commentKey,
        time: Date.now(),
    }).then(() => {
        alert("comment success!")
    }).catch((error) => {
        console.log(error);
    });
}

export async function fetch_comments(postKey) {
    const path = 'posts/' + postKey + '/comments/';
    return await get(ref(db, path)).then((snapshot) => {
        const commentsArray = [];
        snapshot.forEach((val) => {
            commentsArray.push(val.val());
        });
        if (snapshot.exists()) {
            commentsArray.sort((a, b) => b.time - a.time);
        }
        return commentsArray;
    }).catch((error) => {
        console.error(error);
    });
}
