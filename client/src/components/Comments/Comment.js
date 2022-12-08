import React, { useContext, useEffect, useState } from 'react';
import deleteIcon from '../../Images/icon/delete.png';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Like from '../../Images/icon/like.png';
import Liked from '../../Images/icon/liked.png';

function Comment({ comment, postId, getComments }) {
  
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(false);

  const checkLike = () => {
    if (comment.likes.length !== 0) {
      for (let i = 0; i < comment.likes.length; i++) {
        if (comment.likes[i] === user._id) {
          setLike(true);
        }
      }
    }
  };

  const deleteComment = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("id", comment._id);
    urlencoded.append("post", postId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/comments/delete", requestOptions);
      const result = await response.json();
      alert("Comment successfully deleted!");
      getComments(postId);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const likeComment = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("comment", comment._id);
    urlencoded.append("user", user._id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/comments/likes", requestOptions);
      const result = await response.json();
      alert("Post successfully liked!");
      getComments(postId);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const removeLike = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("comment", comment._id);
    urlencoded.append("user", user._id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/comments/removelike", requestOptions);
      const result = await response.json();
      alert("Like successfully removed!");
      getComments(postId);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  useEffect(() => {
    checkLike();
  }, []);
  
  return (
    <>
      <div className="commentDiv">
        <img src={comment.author.profilePic} alt="commentpic" className="commentUserPic"></img>
        <div>
          <div className="commentHeader">
            <Link to={`user-${comment.author._id}`} className="link"><h1 className="commentUsername">{comment.author.username}</h1></Link>
              <div>
                <p>{comment.date}</p>
              {comment.author.username === user.username && <img src={deleteIcon} alt="delete" onClick={deleteComment} title="delete your comment" className="deleteIconComment"></img>}
              </div>
          </div>
          <p>{comment.text}</p>
          <div className="likesDivComment">
            {!like ? <Link onClick={likeComment}><img src={Like} alt="like" title="Like the comment!" className="metaIconComment" /></Link>
            :
            <Link onClick={removeLike}><img src={Liked} alt="liked" title="Remove the like!" className="metaIconComment" /></Link>}
            {comment.likes && <p>{comment.likes.length} Likes</p>}
        </div>
        </div>
      </div>
      </>
  )
}

export default Comment