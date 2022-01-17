import React, {useState} from "react";
import {Dropdown, Card} from "react-bootstrap";
import {add_post_comment} from "../database/createpost";
import {firebase} from "./database/firebase";
import {fetch_posts} from "./database/fetchposts.js";
import {onValue, getDatabase, ref} from "firebase/database"
//imported firebase to get all comments per each post


const Feed = ({ posts, category }) => {
    return (
        <div className="feed">
            { posts ? Object.values(posts).filter(post => category === "" || post.category === category).map( post =>
                <Post key={post.postkey} post={post}  />) : null
            }
        </div>
    );
}

// a copy of Feed because I imagine a feed under eadh post of comments
const Comments = ({ com }) => {
    return (
        <div className="feed">
            { com.map(comment =>
              <CommentText key={comment.postkey} comment={comment}  />
            )}
        </div>
    );
}

// cards under each post of all previously posted comments like post in the feed
const CommentText = ({comment}) => {
  return (
    <Card.Body>
      <Card.Title>{ comment.text }</Card.Title>
    </Card.Body>
  )
}

const handleSubmit = (txt, post) => {
    add_post_comment(post, txt);
}

const Comment = ({post}) => {
    const [txt, setTxt] = useState("")

    const pressSubmit = (event) => {
      event.preventDefault();
      handleSubmit(txt, post);
      setTxt("");
    }

    return (
        <form onSubmit={pressSubmit}>
            <textarea onChange={(e) => {
                setTxt(e.target.value);
            }}/>
            <button>submit</button>
        </form>
    );
}
// I am trying to get all of the comments and upload them into the comments section similar to feed under each post
// this allows us to get only each posts individual comments
const Post = ({ post, handleClick }) => {
    const [selected, setSelected] = useState(false);

    let comments;
    const db = ref(getDatabase(firebase), "/posts"+ post.postkey + '/comments/');
    onValue(db, () => {
        fetch_posts().then(value => {
            comments = value
        })
    })

    return (
        <Card className="m-2" onClick={() => {
            console.log("clicked", post.postkey);
            setSelected(true)
        }}>
            <Card.Body>
                <Card.Title>{ post.text }</Card.Title>

                <Comments> com={comments}</Comments>
                <Card.Text>{post.creator + " " + new Date(post.time).toLocaleString()}</Card.Text>
            </Card.Body>
            {selected ? <Comment post={post}/>: null}
        </Card>
    );
}


function Community({ posts }) {
    const [category, setCategory] = useState("")

    const handleSelect=(e)=>{
        setCategory(e)
    }

    return (

        <div>
            <Dropdown onSelect={handleSelect} className="m-3">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Filter
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="">All</Dropdown.Item>
                    <Dropdown.Item eventKey="event">Event</Dropdown.Item>
                    <Dropdown.Item eventKey="question">Question</Dropdown.Item>
                    <Dropdown.Item eventKey="promotion">Promotion</Dropdown.Item>
                    <Dropdown.Item eventKey="miscellaneous">Miscellaneous</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Feed posts={posts} category={category}/>
        </div>
    );
}

export default Community;
