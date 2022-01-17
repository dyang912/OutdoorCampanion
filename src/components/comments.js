import {Card} from "react-bootstrap";
import {add_post_comment, fetch_comments} from "../database/comments";
import React, {useEffect, useState} from "react";
import {getDatabase, onValue, ref} from "firebase/database";
import {firebase} from "../database/firebase";

const PostedComment = ({ comments }) => {
    return (
        <div className="feed">
            { comments ? comments.map(comment => <CommentText key={comment.commentKey} comment={comment} />) : null}
        </div>
    );
}

const CommentText = ({ comment }) => {
    return (
        <Card.Body>
            <Card.Text>{ comment.text }</Card.Text>
        </Card.Body>
    )
}

export function Comments({ postKey }) {
    const [txt, setTxt] = useState("")

    const pressSubmit = (event) => {
        event.preventDefault();
        add_post_comment(postKey, txt);
        setTxt("");
    }

    const [comments, setComments] = useState();
    useEffect(() => {
        const db = ref(getDatabase(firebase), 'posts/' + postKey + '/comments/');
        onValue(db, () => {
            fetch_comments(postKey).then(value => {
                setComments(value)
            })
        })
    }, []);

    return (
        <form onSubmit={pressSubmit}>
            <PostedComment comments={comments}/>

            <textarea onChange={(e) => {
                setTxt(e.target.value);
            }}/>
            <button>submit</button>
        </form>
    );
}