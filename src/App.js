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

function App() {
    const [user] = useUserState();
    const [UID, setUID] = useState("");
    const [UName, setUName] = useState("");

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
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Community posts={posts}/>} />
                <Route path="/login" element={<Login user={user} UID={UID} UName={UName}
                                                     setUID={setUID} setUName={setUName}
                />} />
                <Route path="/newpost" element={<NewPost user={user} UName={UName}/>} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
