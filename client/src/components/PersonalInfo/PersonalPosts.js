import React, { useEffect, useState } from 'react';
import PersonalPost from './PersonalPost';

function PersonalPosts({userId}) {

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/posts/personal?author=${userId}`);
            const result = await response.json();
            setPosts(result);
        } catch (error) {
            console.log("error :>> ", error);
        };
    };

    useEffect(() => {
        if (userId) {
            getPosts();
        };
    }, [userId]);
    
  return (
    <>
        <div className="personalPostsDiv">
            {posts && posts.length > 0 ? posts.map((post, index) => {
                return <PersonalPost key={index} post={post} />
            })
            :<p style={{fontStyle: "italic"}}>No posts yet</p>}
        </div>
    </>
  )
}

export default PersonalPosts