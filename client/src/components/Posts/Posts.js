import React, { useState } from 'react';
import Post from './Post';

function Posts() {

  const [posts, setPosts] = useState([]);
  

  return (
    <>
      <div className="posts">
        {posts && posts.map((index, post) => {
          return <Post key={index} post={post} />
        })}
      </div>
      </>
  )
}

export default Posts