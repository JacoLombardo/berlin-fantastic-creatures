import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import userPic from '../../Images/profile pics/gustavo.jpg';
import Comments from '../Comments/Comments';
import ShareComment from '../Comments/ShareComment';
import deleteIcon from '../../Images/icon/delete.png';
import { Link } from 'react-router-dom';
import Favourite from '../../Images/icon/favourite.png';
import Favourited from '../../Images/icon/favourited.png';
import Like from '../../Images/icon/like.png';
import Liked from '../../Images/icon/liked.png';
import change from '../../Images/icon/exchange.png';
import submit from '../../Images/icon/arrow.png';
import back from '../../Images/icon/back.png';
import { ContentContext } from '../../context/ContentContext';

function Post({ post, getPosts, category }) {

  const { user } = useContext(AuthContext);
  const { deleteImage, likePost, removeLike, addToFavourites, removeFromFavourites } = useContext(ContentContext);
  const [comments, setComments] = useState([]);
  const [fav, setFav] = useState(false);
  const [like, setLike] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [imgDataURL, setImgDataURL] = useState(null);
  const text = useRef();

  const checkFav = () => {
    if (user && post.favourited.length !== 0) {
      for (let i = 0; i < post.favourited.length; i++) {
        if (post.favourited[i]._id === user._id) {
          setFav(true);
        }
      }
    }
  };

  const checkLike = () => {
    if (user && post.likes.length !== 0) {
      for (let i = 0; i < post.likes.length; i++) {
        if (post.likes[i]._id === user._id) {
          setLike(true);
        }
      }
    }
  };

  const submitEdit = (event) => {
    event.preventDefault();
    if (imgDataURL) {
      uploadPicture();
    } else {
      submitChange();
    }
  };

  const submitChange = async (img, img_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
    const urlencoded = new URLSearchParams();
    urlencoded.append("id", post._id);
    if (text.current) {
      urlencoded.append("text", text.current.value);
    } if (img) {
      urlencoded.append("img", img);
      urlencoded.append("img_id", img_id);
    };
    
    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/posts/update", requestOptions);
      await response.json();
      getPosts(category);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const deletePost = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("post", post._id);
    urlencoded.append("user", user._id);
    urlencoded.append("img_id", post.img_id);

    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/posts/delete", requestOptions);
      await response.json();
      alert("Post successfully deleted!");
      getPosts(category);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const submitLikePost = () => {
    likePost(post._id, user._id);
    getPosts(category);
  };
  const submitRemoveLike = () => {
    removeLike(post._id, user._id);
    getPosts(category);
  };
  const submitAddToFavourites = () => {
    addToFavourites(post._id, user._id);
    getPosts(category);
  };
  const submitRemoveFromFavourites = () => {
    removeFromFavourites(post._id, user._id);
    getPosts(category);
  };

  const getComments = async (postId) => {
    let url = postId
    try {
      const response = await fetch(`http://localhost:5000/api/comments/comment?post=${url}`);
      const result = await response.json();
      setComments(result);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const uploadPicture = async () => {
    var formdata = new FormData();
    formdata.append("image", previewFile);

    const requestOptions = { method: "POST", body: formdata, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/posts/imageupload", requestOptions);
      const result = await response.json();
      deleteImage(post.img_id);
      submitChange(result.image, result.img_id);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  useEffect(() => {
    let fileReader, isCancel = false;
    if (previewFile) {
      fileReader = new FileReader();
      fileReader.onload = (event) => {
        const { result } = event.target;
        if (result && !isCancel) {
          setImgDataURL(result)
        }
      }
      fileReader.readAsDataURL(previewFile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [previewFile]);

  useEffect(() => {
    getComments(post._id);
    checkFav();
    checkLike();
  }, []);

  return (
    <>
      <div className="postDiv" id={post._id}>
        <div className="postHeader">
          {post.author ? <img src={post.author.profilePic} alt="userpic" className="postUserPic"></img> : <img src={userPic} alt="userpic" className="postUserPic"></img>}
          <div>
            {post.author && user && <div className="postUsernameAction">
              <Link to={`user-${post.author._id}`} className="link"><h1 className="postUsername">{post.author.username}</h1></Link>
              {user && post.author.username === user.username && 
              <div className="actionIconsDiv">
                  {!showInput ? <Link onClick={() => { setShowInput(true) }}><img src={change} alt="change" title="Edit your comment" className="changeIcon" /></Link>
                    :
                    <div>
                      <Link onClick={() => { setImgDataURL(null); setShowInput(false) }}><img className="changeIcon" src={back} alt="change" title="Discard your change"></img></Link>
                      <Link onClick={() => { submitEdit(); setShowInput(false) }}><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>
                    </div>}
                  <Link onClick={deletePost}><img src={deleteIcon} alt="delete" title="Delete your comment" className="deleteIconPost" /></Link>
              </div>}
            </div>}
            <p className="postDate">{post.date}</p>
          </div>
        </div>
        {!showInput ? <p>{post.text}</p> :
          <textarea className="postInputText" type="text" name="post-text" ref={text} defaultValue={post.text} />}
        {showInput && <input className="postEditInput" type="file" accept="image/*" name="img" onChange={(event) => { setPreviewFile(event.target.files[0]) }} />}
        {!imgDataURL ? <img src={post.img} alt="post-img" className="imgPreview"></img> : <img src={imgDataURL} alt="post-pic" className="imgPreview" />}
        <div className="likesDiv">
          <div className="likesDiv">
            {!like ? <Link onClick={() => { submitLikePost(); setLike(true) }}><img src={Like} alt="like" title="Like the post!" className="metaIcon" /></Link>
            :
            <Link onClick={() => { submitRemoveLike(); setLike(false) }}><img src={Liked} alt="liked" title="Remove the like!" className="metaIcon" /></Link>}
            {post.likes && <p>{post.likes.length} Likes</p>}
          </div>
          {!fav ? <Link onClick={() => { submitAddToFavourites(); setFav(true) }}><img src={Favourite} alt="favourite" title="Add the post to your favourites!" className="metaIcon" /></Link>
            :
            <Link onClick={() => { submitRemoveFromFavourites(); setFav(false) }}><img src={Favourited} alt="favourited" title="Remove post from your favourites!" className="metaIcon" /></Link>}
        </div>
        <hr className="hr4"></hr>
        {user && <ShareComment postId={post._id} getComments={getComments} />}
        <Comments postId={post._id} comments={comments} getComments={getComments} />
      </div>
    </>
  )
}

export default Post