import { getDatabase, ref,set} from "firebase/database";
import { firebase  } from "./firebase";


const db = getDatabase();

function getRandomInt() {
  return Math.floor(Math.random() * 1728354123897);
}

export function make_post(writtentext, userName, category, navigate) {
    const postkey = getRandomInt()
    set(ref(db, 'posts/' + postkey), {
        text: writtentext,
        time: Date.now(),
        postkey: postkey,
        creator: userName,
        category: category,
    }).then(() => {
        alert("post success!")
        navigate('/')()
    }).catch((error) => {
        console.log(error);
        // alert("error!")
    });
}
