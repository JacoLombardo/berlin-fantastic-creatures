import React from 'react';
import { HashLink } from 'react-router-hash-link';

function PersonalPost({ post }) {
  return (
    <>
      {post.category === "ubahn" ?
        < HashLink to={`/ubahn/#${post._id}`}>
          <div className="personalPostDiv">
            <img src={post.img} alt="post-pic" className="personalPostImg" />
            <p className="personalPostDate">{post.date}</p>
          </div>
        </HashLink>
        :
        <HashLink to={`/city/#${post._id}`}>
          <div className="personalPostDiv">
            <img src={post.img} alt="post-pic" className="personalPostImg" />
            <p className="personalPostDate">{post.date}</p>
          </div>
        </HashLink>
      }
    </>
  )
}

export default PersonalPost