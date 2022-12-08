import React from 'react';
import Post from './Post';

function Posts({ ubahn, city, getPosts, posts }) {

  let test = "";
  if (ubahn) {
    test = ubahn
  } else if (city) {
    test = city
  }

  return (
    <>
      <div>
        {posts && posts.map((post, index) => {
          return <Post key={index} test={test} post={post} getPosts={getPosts} />
        })}
      </div>
      </>
  )
}

export default Posts