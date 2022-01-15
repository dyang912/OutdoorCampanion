import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

import {make_post} from "../database/createpost";


function NewPost({user, UName}) {
    const [posttext, makePost] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <form className = "new-post-form">
                <div className = "new-post mb-3">
                    <label for="formtext" class="form-label">What's on your mind?</label>
                    <input class="form-control" id="formtext" placeholder="Create a post" value={posttext}
                    onChange={(e) => makePost(e.target.value)} />
                  </div>  
                  <div className = "post-category mb-3">
                    <label for="formcategory" class="form-label">Category</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Choose your category</option>
                         <option value="1">Hiking</option>
                        <option value="2">Biking</option>
                        <option value="3">Swimming</option>
                    </select>
                  </div> 
                <div class="d-grid gap-3 col-3 mx-auto p-2">
                    <button type="button" class="btn btn-outline-dark" onClick={() => {
                        user ? make_post(posttext, UName, navigate) : navigate('/login')() ;
                    }}>post</button>
                </div> 
                
            </form>
        </div>
    );
}

export default NewPost;