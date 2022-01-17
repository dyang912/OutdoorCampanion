import {Card} from "react-bootstrap";
import {add_post_comment, fetch_comments} from "../database/comments";
import {useEffect, useState} from "react";
import {getDatabase, onValue, ref} from "firebase/database";
import {firebase} from "../database/firebase";
import {Button} from "react-bootstrap";

const PostedComment = ({ comments }) => {
    if (comments) {
        return (
            <Card className="m-2">
                <ul className="list-group list-group-flush">
                    {comments.map(comment => <CommentText key={comment.commentKey} comment={comment} />)}
                </ul>
            </Card>
        );
    }
    return null;
}

const CommentText = ({ comment }) => {
    return (
        <li className="list-group-item">
            <Card.Text>{ comment.text }</Card.Text>
            <Card.Text>
                <small className="text-muted">{ new Date(comment.time).toLocaleString() }</small>
            </Card.Text>
        </li>
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
        <form onSubmit={pressSubmit} className="form-inline">
            <PostedComment comments={comments}/>
            <div className="ms-2">
                <textarea onChange={(e) => {
                    setTxt(e.target.value);
                }}/>
            </div>
            <Button className="ms-2" type="submit" >submit</Button>
        </form>
    );
}