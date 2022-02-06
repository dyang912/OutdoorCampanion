import React, {useState} from "react";
import {firebase, db} from "../database/firebase";
import { child, get, orderByChild, ref, set, getDatabase, onValue } from "firebase/database";
import { getFirestore, collection, query, orderBy, limit, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

async function findText(id){
  const post = ref(getDatabase(firebase), "/posts/"+id+"");
  onValue(post, (snap) => {
    console.log({ id:snap.val().postKey, text:snap.val().text})
;    return { id:snap.val().postKey, text:snap.val().text};
  })
}

export async function findGroupchats() {
  const groupchatsdb = ref(getDatabase(firebase), "/groupchats");
  onValue(groupchatsdb, (snap) => {
    let groupchats = [];
    let groupchattexts = [];
     snap.forEach(function(childNodes){


        //This loop iterates over children of user_id
        //childNodes.key is key of the children of userid such as (20170710)
        let members = childNodes.val().members;
        Object.keys(members).forEach(uid =>{
          if (uid === auth.currentUser.uid){
            groupchats.push(childNodes.key);
          }
        })

        /*members.forEach(function(children){
          console.log(children.key);
        })*/
        //childNodes.val().time;
        //childNodes.val().rest_time;
        //childNodes.val().interval_time;


    });
    groupchats.forEach(id => {
        groupchattexts.push(findText(id));
    });
    console.log(groupchattexts);
    return groupchattexts;
  });
}



const Groupchat = ({ groupchat }) => (
  <div>
    it worked {groupchat.text}
  </div>
);

const GroupchatList = ( {groupchats} ) => (
  <div>
    { groupchats.groupchats ? groupchats.groupchats.map(groupchat => <Groupchat key={groupchat.id} groupchat={ groupchat } />)  :null }
  </div>
);

function Groupchats(groupchats){

  return (
    <div>
    <GroupchatList groupchats={groupchats} />
    </div>
  )
};



export default Groupchats;
