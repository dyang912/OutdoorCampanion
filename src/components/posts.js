import React, {useState} from "react";
import {Card, Image} from "react-bootstrap";
import {Comments} from "./comments";
import {isMobile} from 'react-device-detect';
import * as FaIcons from "react-icons/fa";
import {Link, useLocation} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';


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
    const categoryfn = () =>{
        if (post.category === 'event'){
            return <div class="alert alert-primary">Event <FaIcons.FaHiking />
                <Link to={"/share"}>
                    <FaIcons.FaShare />
                </Link>
            </div>
        }
        else if (post.category === 'question'){
            return <div class="alert alert-danger"> Question <FaIcons.FaQuestionCircle />
                <Link to={"/share"}>
                    <FaIcons.FaShare />
                </Link>
            </div>
        }
        else if (post.category === 'promotion'){
            return <div class="alert alert-dark"> Promotion <FaIcons.FaBullhorn />
                <Link to={"/share"}>
                    <FaIcons.FaShare />
                </Link>
            </div>
        }
        else {
            return <div class="alert alert-success"> Experience <FaIcons.FaCampground/>
            </div>
        }
    }

    const [commentOpen, setOpen] = useState(false);
    return (
        <Card className="m-2"
            //   onClick={() => setSelected(true)}
            //   onDoubleClick={() => setSelected(false)}
        >

            <Card.Body>
                {categoryfn()}
                <Card.Title>{ post.text }</Card.Title>
                { post.image?
                    isMobile ?
                        <Image src={post.image} alt="postImage" fluid={true} style={{maxWidth:"100%"}}/> :
                        <Image src={post.image} alt="postImage" fluid={true} style={{maxWidth:"30%"}}/>
                    : null
                }
                <Card.Text>{post.creator + " " + new Date(post.time).toLocaleString()}</Card.Text>
                {selected ? <button type="button" className="btn btn-secondary" onClick={() => setSelected(false)}>close comments</button> : <button type="button" className="btn btn-outline-dark" onClick={() => setSelected(true)}>{!post.comments ? 0 : Object.keys(post.comments).length} comment(s)</button>}
            </Card.Body>
            {selected ? <Comments postKey={post.postKey} UName = {UName}/>: null}
        </Card>

    );
}



