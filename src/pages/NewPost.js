import React, {useState} from "react";
import {make_post} from "../database/createpost";

function NewPost({user, UName}) {
    const [posttext, makePost] = useState("");

    return (
        <div>
            <h1>NewPost</h1>

            <input placeholder="Make a post" value={posttext}
                   onChange={(e) => makePost(e.target.value)} />
            <br></br>
            <button onClick={() => {
                user ? make_post(posttext, UName) : alert("please login");
            }}>post</button>
        </div>
    );
}

export default NewPost;