import React, {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Feed = ({ posts, category }) => (
    <div className="feed">
        { posts ? Object.values(posts).filter(post => category === "" || post.category === category).map( post =>
            <Post key={post.postkey} post={ post } />) : null
        }
    </div>
);

const Post = ({ post }) => (
    <div className="card m-2">
        <div className="card-body">
            <div className="card-text">{ post.creator + ":" + post.text  }</div>
            <div className="card-text">{new Date(post.time).toLocaleString()}</div>
        </div>
    </div>
);


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