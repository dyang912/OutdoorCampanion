import React, {useState} from "react";
import {firebase, db} from "../database/firebase";
import { child, get, orderByChild, ref, set, getDatabase, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Link, useLocation} from "react-router-dom";
import {Card, Image} from "react-bootstrap";

const auth = getAuth();

async function findText(id){
  const post = ref(getDatabase(firebase), "/posts/"+id+"");
  let object = {};
  await onValue(post, (snap) => {
      object = { id:snap.val().postKey, text:snap.val().text, creator:snap.val().creator};
  })
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
    groupchats.forEach(id => {
        findText(id).then((value) => groupchattexts.push(value));
    });
    objects = groupchattexts;
  });
  return objects;
}

const Groupchat = ({ groupchat }) => (
    <Link to={`/chat/${groupchat.id}`} className= "nav-link">
      <div>
        {groupchat.text + " (by " + groupchat.creator + ")"}
      </div>
    </Link>
);

function GroupchatList( {groupchats} ) {
  return (
        <div>
          { groupchats ? groupchats.map(groupchat => <Card className="m-2"><Card.Body> <Groupchat key={groupchat.id} groupchat={ groupchat }  /> </Card.Body> </Card>)  :null }
        </div>
    );
}

function Groupchats({ groupchats }){
  return (
    <div>
      <GroupchatList groupchats={groupchats} />
    </div>
  );
}


export default Groupchats;
