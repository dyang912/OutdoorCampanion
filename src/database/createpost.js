import { getDatabase, ref, child, set, get } from "firebase/database";

const db = getDatabase();

function getRandomInt() {
  return Math.floor(Math.random() * 1728354123897);
}

export function make_post(writtentext) {
    const postkey = getRandomInt()
    set(ref(db, 'posts/' + postkey), {
        text: writtentext,
        time: Date.now(),
        postkey: postkey,
    });
}
