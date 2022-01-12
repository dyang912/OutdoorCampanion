import './App.css';
import {useState} from 'react';
import firebase from "./database/firebase";
import {fetch_posts} from "./database/fetchposts.js";
import {make_post} from "./database/createpost.js";
import {useUserState} from "./database/users";
import {SignInButton, SignOutButton} from "./components/users";

function App() {
    const [user] = useUserState();
    const [UID, setUID] = useState("your email: NULL");
    const changeText = (text) => setUID(text);

    const [posts, setPost] = useState()

    const [posttext, makePost] = useState();

    fetch_posts().then(value => {
        setPost(value)
    })

    const Feed = ({ posts }) => (
        <div>
            { posts ? Object.values(posts).map(post => <Post post={ post } />) : null }
        </div>
      );

    const Post = ({ post }) => (
        <div>
          { post.text }
        </div>
      );

    return (
    <div className="App">
        <h1>test login</h1>
            { user ? <SignOutButton changeText={ changeText }/> : <SignInButton changeText={ changeText }/> }
        <div>{UID}</div>

        <div>
            <Feed posts={posts}/>
        </div>
        <div>

          <input placeholder="Make a post" value={posttext}
               onChange={(e) => makePost(e.target.value)} />
          <br></br>
          <button onClick={() => make_post(posttext)}>post</button>

        </div>
    </div>
    );
}

export default App;
