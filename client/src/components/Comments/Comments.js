import React from 'react';
import Comment from './Comment';

function Comments({ postId, comments, getComments }) {

  return (
    <>
      <div>
        {comments && comments.map((comment, index) => {
          return <Comment key={index} comment={comment} postId={postId} getComments={getComments} />
        })}
      </div>
    </>
  )
}

export default Comments