import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {make_post} from "../database/posts";

function NewPost({user, UName}) {
    const [posttext, makePost] = useState("");
    const [now, setOption] = useState("event");
    const navigate = useNavigate();

    const options = [
        {
            label: "Event",
            value: "event",
        },
        {
            label: "Question",
            value: "question",
        },
        {
            label: "Promotion",
            value: "promotion",
        },
        {
            label: "Miscellaneous",
            value: "miscellaneous",
        },
    ];

    return (
        <div>
            <form className = "new-post-form">
                <div className = "new-post mb-3">
                    <label htmlFor="formtext" className="form-label">What's on your mind?</label>
                    <input className="form-control" id="formtext" placeholder="Create a post" value={posttext}
                    onChange={(e) => makePost(e.target.value)} />
                </div>

                <div className = "post-category mb-3">
                    <label htmlFor="formcategory" className="form-label">Category</label>
                    <select className="form-select" aria-label="Default select example" defaultValue="event"
                          onChange={(e) => {
                              setOption(e.target.value);
                          }}
                    >
                        <option>Select your category</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <input
                   className="form-control" name="files[] " id="files " type="file"
                />
                <div className="d-grid gap-3 col-3 mx-auto p-2">
                    <button type="button" className="btn btn-outline-dark" onClick={() => {
                        user ? make_post(posttext, UName, now, navigate, document.getElementById("files ").files[0]) :
                               alert("please login!"); navigate('/login');
                    }}>post</button>
                </div>

            </form>
        </div>
    );
}

export default NewPost;
