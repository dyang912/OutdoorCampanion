import React, {useState} from "react";
import {Card} from "react-bootstrap";
import {Comments} from "./comments";

export const Feed = ({ posts, category }) => {
    return (
        <div className="feed">
            { posts ? Object.values(posts).filter(post => category === "" || post.category === category).map( post =>
                <Post key={post.postKey} post={post}  />) : null
            }
        </div>
    );
}

const Post = ({ post, handleClick }) => {
    const [selected, setSelected] = useState(false);

    return (
        <Card className="m-2"
              onClick={() => setSelected(true)}
              onDoubleClick={() => setSelected(false)}
        >
            <Card.Body>
                <Card.Title>{ post.text }</Card.Title>
                { post.image? <img src = { post.image } alt="postImage"/> : null }
                <Card.Text>{post.creator + " " + new Date(post.time).toLocaleString()}</Card.Text>
            </Card.Body>
            {selected ? <Comments postKey={post.postKey}/>: null}
        </Card>
    );
}