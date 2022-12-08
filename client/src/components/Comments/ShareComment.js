import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';

function ShareComment({ postId, getComments }) {
    
    const { user } = useContext(AuthContext);
    const text = useRef();

    const submitComment = (event) => {
        if (event.key === "Enter") {
            shareComment();
        };
    };

    const shareComment = async () => {
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        const urlencoded = new URLSearchParams();
        urlencoded.append("author", user._id);
        urlencoded.append("text", text.current.value);
        urlencoded.append("date", new moment().format('MMMM Do YYYY, h:mm:ss a'));
        urlencoded.append("post", postId);

        const requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
        try {
            const response = await fetch("http://localhost:5000/comments/share", requestOptions);
            const result = await response.json()
            alert("Comment successfully shared!");
            getComments(postId);
        } catch (error) {
            console.log("error :>> ", error);
        };
    };

  return (
      <>
          <div className="commentDiv">
              <img src={user.profilePic} alt="commentpic" className="commentUserPic"></img>
              <div>
                  <h1 className="commentUsername">{user.username}</h1>
                  <textarea className="commentInput" type="text" name="comment-text" ref={text} onKeyUp={submitComment}></textarea>
              </div>
          </div>
    </>
  )
}

export default ShareComment