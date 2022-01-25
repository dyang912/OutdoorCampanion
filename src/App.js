import './App.css';
import {useEffect, useState} from 'react';
import {firebase} from "./database/firebase";
import {fetch_posts} from "./database/posts.js";
import {useUserState} from "./database/users";
import {onValue, getDatabase, ref} from "firebase/database"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Community from "./pages/Community";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import NavigationBar from "./components/navigationBar";
import ErrorPage from "./pages/Error";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [UEmail, setUEmail] = useState("");
    const [UName, setUName] = useState("");
    const [UPhotoUrl, setUPhotoUrl] = useState("");
    const [user] = useUserState({setUEmail, setUName, setUPhotoUrl});
    const [posts, setPost] = useState();


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
                <h1 style={{fontFamily:"Fredericka the Great"}} >Outdoor Companion</h1>
            </div>

            <Routes>
                <Route path="/" element={<Community posts={posts} />} />
                <Route path="/login" element={<Login user={user} UEmail={UEmail} UName={UName}
                                                     setUEmail={setUEmail} setUName={setUName}
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
