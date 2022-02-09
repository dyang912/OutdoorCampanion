import React, {useRef, useState} from "react";
import {firebase, db} from "../database/firebase";
import { child, get, orderByChild, ref, set } from "firebase/database"
import { getFirestore, collection, query, orderBy, limit, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Chat.css';



function getRandomInt() {
    return Math.floor(Math.random() * 1728354123897);
}

//const db = getFirestore();

export async function fetch_messages(id) {
    return await get(child(ref(db), `groupchats/${id}/messages`, orderByChild('createdAt'))).then((snapshot) => {
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

function Chat({messages,id}) {
  const dummy = useRef();
  //const messagesRef = collection(db, "messages");

  console.log("messages",messages);
  console.log("id",id);

  const [formValue, setFormValue] = useState('');

  async function sendMessage(event) {
    event.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    const messageid = getRandomInt();

    await set(ref(db, "groupchats/"+id+"/messages/" + messageid), {
      text: formValue,
      createdAt: Date.now(),
      uid,
      photoURL,
      id: messageid
    }).then(() => {
        alert("post success!")
    }).catch((error) => {
        console.log(error);
    });

    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<div>
    <main >

      {messages ? Object.values(messages).map(msg => <ChatMessage key={msg.id} text={msg.text} uid={msg.uid} photoURL={msg.photoURL} />) : null}

      <span ref={dummy}/>

    </main>

    <form onSubmit={sendMessage} className="formmessages">

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message" className="inputmessages"/>

      <button type="submit" disabled={!formValue} className="buttonmessages">Send</button>

    </form>
  </div>)
}


const ChatMessage = ({text, uid, photoURL }) => {



  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
}

export default Chat;
