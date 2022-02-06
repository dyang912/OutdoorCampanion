import './App.css';
import {useEffect, useState} from 'react';
import {firebase} from "./database/firebase";
import {fetch_posts} from "./database/posts.js";
import {fetch_messages} from "./pages/Chat.js";
import {findGroupchats} from "./pages/Groupchat.js";
import {useUserState} from "./database/users";
import {onValue, getDatabase, ref} from "firebase/database"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Community from "./pages/Community";
import Chat from "./pages/Chat";
import Groupchats from "./pages/Groupchat.js";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import NavigationBar from "./components/navigationBar";
import ErrorPage from "./pages/Error";
import Share from "./components/share"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [UEmail, setUEmail] = useState("");
    const [UName, setUName] = useState("");
    const [UPhotoUrl, setUPhotoUrl] = useState("");
    const [user] = useUserState({setUEmail, setUName, setUPhotoUrl});
    const [posts, setPost] = useState();
    const [messages, setMessages] = useState();
    const [dbgroupchats, setdbgroupchats] = useState();


    useEffect(() => {
        const db = ref(getDatabase(firebase), "/posts");
        onValue(db, () => {
            fetch_posts().then(value => {
                setPost(value);
            })

        })
        const messagesdb = ref(getDatabase(firebase), "/messages");
        onValue(messagesdb, () => {
            fetch_messages().then(value => {
              //console.log(value);
                setMessages(value);
                //console.log(messages);

            })

        })
        const groupchatsdb = ref(getDatabase(firebase), "/groupchats");
        onValue(groupchatsdb, () => {
            findGroupchats().then(value => {
                console.log(value);
                setdbgroupchats(value);
              //  console.log(dbgroupchats);

            })

        })

    }, []);

    return (
        <BrowserRouter>
            <div className="page-header">
                <h1 style={{fontFamily:"Fredericka the Great"}} >Outdoor Companion</h1>
            </div>

            <Routes>
                <Route path="/" element={<Community posts={posts} UName={UName} UEmail={UEmail}/>} />
                <Route path="/login" element={<Login user={user} UEmail={UEmail} UName={UName}
                                                     setUEmail={setUEmail} setUName={setUName}
                                                     UPhotoUrl={UPhotoUrl} setUPhotoUrl={setUPhotoUrl}
                />} />

                <Route path="/newpost" element={<NewPost user={user} UName={UName} UEmail={UEmail}/>} />
                <Route path="/newpost" element={<NewPost user={user} UName={UName}/>} />
                <Route path="/chat" element={<Chat messages={messages}/>} />
                <Route path="/groupchats" element={<Groupchats messages={dbgroupchats}/>} />

                <Route path="/share" element={<Share UName={UName}/>} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <NavigationBar />

        </BrowserRouter>
    );
}

export default App;
