import React, {useState} from "react";
import {firebase, db} from "../database/firebase";
import {fetch_messages} from "./Chat";
import { child, get, orderByChild, ref, set, getDatabase, onValue } from "firebase/database";
import { getFirestore, collection, query, orderBy, limit, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Link, useLocation} from "react-router-dom";

const auth = getAuth();

async function findText(id){
  const post = ref(getDatabase(firebase), "/posts/"+id+"");
  let object = {};
  await onValue(post, (snap) => {
    console.log({ id:snap.val().postKey, text:snap.val().text});
    object = { id:snap.val().postKey, text:snap.val().text};
  })
  console.log("mark",object);
  return (object);
}

export async function findGroupchats() {

  const groupchatsdb = ref(getDatabase(firebase), "/groupchats");
  let objects = [];
  await onValue(groupchatsdb, (snap) => {
    let groupchats = [];
    let groupchattexts = [];
     snap.forEach(function(childNodes){
       let members = childNodes.val().members;
        Object.keys(members).forEach(uid =>{
          if (uid === auth.currentUser.uid){
            groupchats.push(childNodes.key);
          }
        })

    });
    console.log("groupchats",groupchats)
    groupchats.forEach(id => {
        console.log("id",id);
        findText(id).then((value) => groupchattexts.push(value));
    });
    console.log("groupchattexts",groupchattexts);
    objects = groupchattexts;
  });
  return objects;
}



const Groupchat = ({ groupchat,setMessages }) => (
  <Link to={"/chat"} className= "nav-link" onClick={() => fetch_messages().then(value => {setMessages(value);})}>
      <div>
        it worked {groupchat.text}
      </div>
  </Link>

);

function GroupchatList( {groupchats,setMessages} ) {
  return (
        <div>
          { groupchats ? groupchats.map(groupchat => <Groupchat key={groupchat.id} groupchat={ groupchat } setMessages={setMessages} />)  :null }
        </div>
    );
}

function Groupchats({ groupchats, setMessages }){
  return (
    <div>
      <GroupchatList groupchats={groupchats} setMessages={setMessages}/>
    </div>
  );
}



export default Groupchats;
