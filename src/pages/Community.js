import React from "react";

const Feed = ({ posts }) => (
    <div>
        { posts ? Object.values(posts).map(post => <Post key={post.postkey} post={ post } />) : null }
    </div>
);

const Post = ({ post }) => (
    <div>
        { post.creator + ":" + post.text }
    </div>
);

function Community({ posts }) {
    return (
        <div>
            <h1>Community</h1>

            <Feed posts={posts}/>
        </div>
    );
}

export default Community;