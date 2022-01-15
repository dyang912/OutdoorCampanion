import React, {useState} from "react";
import {make_post} from "../database/createpost";

function NewPost({user, UName}) {
    const [posttext, makePost] = useState("");
    const [now, setOption] = useState("camping");

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

                <div class="d-grid gap-3 col-3 mx-auto p-2">
                    <button type="button" class="btn btn-outline-dark" onClick={() => {
                        user ? make_post(posttext, UName, now) : alert("please login");
                    }}>post</button>
                </div> 
                
            </form>
        </div>
    );
}

export default NewPost;