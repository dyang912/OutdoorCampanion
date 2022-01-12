import { getDatabase, ref, child, set, get } from "firebase/database";

const db = getDatabase();

function getRandomInt() {
  return Math.floor(Math.random() * 1728354123897);
}

export function make_post(writtentext) {
    set(ref(db, 'posts/' + getRandomInt()), {
        text: writtentext,
        time: Date.now(),
    });
}
