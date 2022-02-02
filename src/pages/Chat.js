import React, {useRef, useState} from "react";
import {firebase, db} from "../database/firebase";
import { child, get, orderByChild, ref, set } from "firebase/database"
import { getFirestore, collection, query, orderBy, limit, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import './Chat.css';



function getRandomInt() {
    return Math.floor(Math.random() * 1728354123897);
}

//const db = getFirestore();

export async function fetch_messages() {
    return await get(child(ref(db), `messages`, orderByChild('createdAt'))).then((snapshot) => {
        const postArray = [];
        snapshot.forEach(function(child) {
            postArray.push(child.val());
        });
        if (snapshot.exists()) {
            postArray.sort((a, b) => b.createdAt - a.createdAt);
            return postArray;
        }
    }).catch((error) => {
        console.error(error);
    });
}



const auth = getAuth();

function Chat(messages) {
  const dummy = useRef();
  //const messagesRef = collection(db, "messages");

  console.log(messages);



  const [formValue, setFormValue] = useState('');

  async function sendMessage(){

    const { uid, photoURL } = auth.currentUser;

    await set(ref(db, 'messages/' + getRandomInt()), {
      text: formValue,
      createdAt: getRandomInt(),
      uid,
      photoURL,
      id: getRandomInt()
    }).then(() => {
        alert("post success!")
    }).catch((error) => {
        console.log(error);
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<div>
    <div>

      {Object.values(messages).map(msg => <ChatMessage key={msg.id} text={msg.text} uid={msg.uid} photoURL={msg.photoURL} />)}

      <span ref={dummy}></span>

    </div>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message" />

      <button type="submit" disabled={!formValue}>Send</button>

    </form>
  </div>)
}


const ChatMessage = ({ key, text, uid, photoURL }) => {



  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
}

export default Chat;
