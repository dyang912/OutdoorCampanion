import React, {useState} from "react";
import {Card, Image} from "react-bootstrap";
import {Comments} from "./comments";
import {isMobile} from 'react-device-detect';
import * as FaIcons from "react-icons/fa";
import {Link, useLocation} from "react-router-dom";


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

    return (
        <Card className="m-2"
              onClick={() => setSelected(true)}
              onDoubleClick={() => setSelected(false)}
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
                <Card.Text>
                    <small className="text-muted">{ post.creator + " " + new Date(post.time).toLocaleString() }</small>
                </Card.Text>
            </Card.Body>
            {selected ? <Comments postKey={post.postKey}/>: null}
        </Card>

    );
}