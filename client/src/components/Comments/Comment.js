import React, { useContext, useEffect, useRef, useState } from 'react';
import deleteIcon from '../../Images/icon/delete.png';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Like from '../../Images/icon/like.png';
import Liked from '../../Images/icon/liked.png';
import change from '../../Images/icon/exchange.png';
import submit from '../../Images/icon/arrow.png';
import back from '../../Images/icon/back.png';
import { ContentContext } from '../../context/ContentContext';

function Comment({ comment, postId, getComments }) {
  
  const { user } = useContext(AuthContext);
  const { likeComment, removeLikeComment } = useContext(ContentContext);
  const [like, setLike] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const text = useRef();

  const checkLike = () => {
    if (user && comment.likes.length !== 0) {
      for (let i = 0; i < comment.likes.length; i++) {
        if (comment.likes[i] === user._id) {
          setLike(true);
        }
      }
    }
  };

  const submitChange = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
    const urlencoded = new URLSearchParams();
    urlencoded.append("id", comment._id);
    urlencoded.append("text", text.current.value);
    
    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/comments/update", requestOptions);
      await response.json();
      getComments(postId);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      submitChange();
      setShowInput(false);
    };
  };

  const deleteComment = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("id", comment._id);
    urlencoded.append("post", postId);

    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/comments/delete", requestOptions);
      await response.json();
      alert("Comment successfully deleted!");
      getComments(postId);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const submitLikeComment = () => {
    likeComment(comment._id, user._id);
    getComments(postId);
  };
  const submitRemoveLikeComment = () => {
    removeLikeComment(comment._id, user._id);
    getComments(postId);
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
              <div className="actionIconsDiv">
                <p className="commentDate">{comment.date}</p>
              {user && comment.author.username === user.username && <div>
                {!showInput ? <Link onClick={() => { setShowInput(true) }}><img src={change} alt="change" title="Edit your comment" className="changeIconComment"></img></Link>
                  :
                  <div>
                    <Link onClick={() => { setShowInput(false) }}><img className="changeIconComment" src={back} alt="change" title="Discard your change"></img></Link>
                    <Link onClick={() => { submitChange(); setShowInput(false) }}><img src={submit} alt="submit" title="Submit your edit" className="changeIconComment"></img></Link>
                  </div>}
                <Link onClick={deleteComment}><img src={deleteIcon} alt="delete" title="Delete your comment" className="deleteIconComment"></img></Link>
              </div>}
              </div>
          </div>
          {!showInput ? <p>{comment.text}</p> :
            <textarea className="commentInput" type="text" name="comment-text" ref={text} onKeyUp={onKeyUp} defaultValue={comment.text} />}
          <div className="likesDivComment">
            {!like ? <Link onClick={() => { submitLikeComment(); setLike(true) }}><img src={Like} alt="like" title="Like the comment!" className="metaIconComment" /></Link>
            :
              <Link onClick={() => { submitRemoveLikeComment(); setLike(false) }}><img src={Liked} alt="liked" title="Remove the like!" className="metaIconComment" /></Link>}
            {comment.likes && <p>{comment.likes.length} Likes</p>}
        </div>
        </div>
      </div>
      </>
  )
}

export default Comment