import './App.css';
import {useState} from 'react';
import firebase from "./database/firebase";
import {add_user, verify_user} from "./database/users";
import {fetch_posts} from "./database/fetchposts.js";
import {make_post} from "./database/createpost.js";

function App() {
    const [name , setName] = useState();
    const [pw , setPW] = useState();

    const [name2 , setName2] = useState();
    const [pw2 , setPW2] = useState();

    const [divText, setDivText] = useState("N/A");
    const changeText = (text) => setDivText(text);

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
        <h1>test register</h1>
        <input placeholder="Enter your name" value={name}
               onChange={(e) => setName(e.target.value)}/>
        <br></br>
        <input placeholder="Enter your password" value={pw}
               onChange={(e) => setPW(e.target.value)} />
        <br></br>
        <button onClick={() => add_user(name, pw)}>register</button>

        <h1>test login</h1>
        <input placeholder="Enter your name" value={name2}
               onChange={(e) => setName2(e.target.value)}/>
        <br></br>
        <input placeholder="Enter your password" value={pw2}
               onChange={(e) => setPW2(e.target.value)} />
        <br></br>
        <button onClick={() =>  {
            verify_user(name2, pw2).then(value => {
                console.log(value)
                changeText(`${value}`)
            })
        }}>login</button>
        <div>{divText}</div>

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
