import React, {useState} from "react";
import {Feed} from "../components/posts";
import {Filter} from "../components/filter";

function Community({ posts, UName }) {
    const [category, setCategory] = useState("")

    const handleSelect=(e)=>{
        setCategory(e)
    }

    return (
        <div>
            <Filter handleSelect={handleSelect}/>
            <Feed posts={posts} category={category} UName = {UName}/>
        </div>
    );
}

export default Community;
