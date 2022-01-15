import './App.css';
import {useEffect, useState} from 'react';
import {firebase} from "./database/firebase";
import {fetch_posts} from "./database/fetchposts.js";
import {useUserState} from "./database/users";
import {onValue, getDatabase, ref} from "firebase/database"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Community from "./pages/Community";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import NavigationBar from "./components/navigationBar";
import ErrorPage from "./pages/Error";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'

function App() {
    const [user] = useUserState();
    const [UID, setUID] = useState("");
    const [UName, setUName] = useState("");
    const [UPhotoUrl, setUPhotoUrl] = useState("");

    const [posts, setPost] = useState("")

    useEffect(() => {
        const db = ref(getDatabase(firebase), "/posts");
        onValue(db, () => {
            fetch_posts().then(value => {
                setPost(value)
            })
        })
    }, []);

    return (
        <BrowserRouter>
            <div className="page-header">
                <h1>Outdoor Companion</h1>
            </div>

            <Routes>
                <Route path="/" element={<Community posts={posts} />} />
                <Route path="/login" element={<Login user={user} UID={UID} UName={UName}
                                                     setUID={setUID} setUName={setUName}
                                                     UPhotoUrl={UPhotoUrl} setUPhotoUrl={setUPhotoUrl}
                />} />
                <Route path="/newpost" element={<NewPost user={user} UName={UName}/>} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <NavigationBar />
            
        </BrowserRouter>
    );
}

export default App;
