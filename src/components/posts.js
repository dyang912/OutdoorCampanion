import React, {useState} from "react";
import {Card, Image} from "react-bootstrap";
import {Comments} from "./comments";
import {isMobile} from 'react-device-detect';

export const Feed = ({ posts, category, UName }) => {
    return (
        <div className="feed">
            { posts ? Object.values(posts).filter(post => category === "" || post.category === category).map( post =>
                <Post key={post.postKey} post={post} UName = {UName}  />) : null
            }
        </div>
    );
}

const Post = ({ post, handleClick, UName }) => {
    const [selected, setSelected] = useState(false);

    return (
        <Card className="m-2"
              onClick={() => setSelected(true)}
              onDoubleClick={() => setSelected(false)}
        >
            <Card.Body>
                <Card.Title>{ post.text }</Card.Title>
                { post.image?
                    isMobile ?
                        <Image src={post.image} alt="postImage" fluid={true} style={{maxWidth:"100%"}}/> :
                        <Image src={post.image} alt="postImage" fluid={true} style={{maxWidth:"30%"}}/>
                    : null
                }
                <Card.Text>
                    <small className="text-muted">{ post.creator + " " + new Date(post.time).toLocaleString() }</small>
                </Card.Text>
            </Card.Body>
            {selected ? <Comments postKey={post.postKey} UName = {UName}/>: null}
        </Card>
    );
}
