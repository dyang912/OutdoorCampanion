import React from "react";

const Feed = ({ posts }) => (
    
    <div className="feed">
        { posts ? Object.values(posts).map(post => <Post key={post.postkey} post={ post } />) : null }
    </div>
);

const Post = ({ post }) => (
    <div className="card m-2">
        <div className="card-body">
            <div className="card-text">{ post.creator + ":" + post.text  }</div>
            <div className="card-text">{new Date(post.time).toLocaleString()}</div>
        </div>
    </div>
);


function Community({ posts }) {
    return (
        <div>
            {/* <h1>Community</h1> */}

            <Feed posts={posts}/>
        </div>
    );
}

export default Community;