import React from 'react';
import Post from './Post';

function Posts({ ubahn, city, getPosts, posts }) {

  let category = "";
  if (ubahn) {
    category = ubahn
  } else if (city) {
    category = city
  }

  return (
    <>
      <div>
        {posts && posts.map((post, index) => {
          return <Post key={index} category={category} post={post} getPosts={getPosts} />
        })}
      </div>
      </>
  )
}

export default Posts