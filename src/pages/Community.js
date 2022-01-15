import React, {useState} from "react";
import {Dropdown, Card} from "react-bootstrap";
import {add_post_comment} from "../database/createpost";

const Feed = ({ posts, category }) => {
    return (
        <div className="feed">
            { posts ? Object.values(posts).filter(post => category === "" || post.category === category).map( post =>
                <Post key={post.postkey} post={post}  />) : null
            }
        </div>
    );
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

const Post = ({ post, handleClick }) => {
    const [selected, setSelected] = useState(false)

    return (
        <Card className="m-2" onClick={() => {
            console.log("clicked", post.postkey);
            setSelected(true)
        }}>
            <Card.Body>
                <Card.Title>{ post.text }</Card.Title>
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
                    <Dropdown.Item eventKey="camping">Camping</Dropdown.Item>
                    <Dropdown.Item eventKey="hiking">Hiking</Dropdown.Item>
                    <Dropdown.Item eventKey="biking">Biking</Dropdown.Item>
                    <Dropdown.Item eventKey="swimming">Swimming</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Feed posts={posts} category={category}/>
        </div>
    );
}

export default Community;