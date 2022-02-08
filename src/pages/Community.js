import React, {useState} from "react";
import {Feed} from "../components/posts";
import {Filter} from "../components/filter";

function Community({ posts, UName, UEmail, uid }) {
    const [category, setCategory] = useState("")

    const handleSelect=(e)=>{
        setCategory(e)
    }

    return (
        <div>
            <Filter handleSelect={handleSelect}/>
            <Feed posts={posts} category={category} UName={UName} UEmail={UEmail} uid={uid}/>
        </div>
    );
}

export default Community;
