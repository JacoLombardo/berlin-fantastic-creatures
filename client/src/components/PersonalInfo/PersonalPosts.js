import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PersonalPost from './PersonalPost';

function PersonalPosts({userId}) {

    const [posts, setPosts] = useState([]);
    const { server } = useContext(AuthContext);

    const getPosts = async () => {
        try {
            const response = await fetch(`${server}/api/posts/personal?author=${userId}`);
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