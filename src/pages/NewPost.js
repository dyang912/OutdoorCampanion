import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

import {make_post} from "../database/createpost";
import 'firebase/storage';




function NewPost({user, UName}) {
    const [posttext, makePost] = useState("");
    const [now, setOption] = useState("camping");
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState('');
    const navigate = useNavigate();

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const options = [
        {
            label: "Camping",
            value: "camping",
        },
        {
            label: "Hiking",
            value: "hiking",
        },
        {
            label: "Biking",
            value: "biking",
        },
        {
            label: "Swimming",
            value: "swimming",
        },
    ];

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
                    <select class="form-select" aria-label="Default select example"
                          onChange={(e) => {
                              console.log(e.target.value);
                              setOption(e.target.value);
                          }}
                    >
                          {options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                          ))}
                    </select>
                </div>
                <label class="form-label" for="customFile">Default file input example</label>
                <input type="file" class="form-control" accept=".jpg,.png,.jpeg" id="customFile" onChange={handleImageAsFile}/>

                <div class="d-grid gap-3 col-3 mx-auto p-2">
                    <button type="button" class="btn btn-outline-dark" onClick={() => {
                        user ? make_post(posttext, UName, now, navigate) : navigate('/login')();
                    }}>post</button>
                </div> 
                
            </form>
        </div>
    );
}

export default NewPost;