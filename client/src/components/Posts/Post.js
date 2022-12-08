import React, { useContext, useEffect, useState } from 'react';
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

function Post({ post, getPosts, test }) {

  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [fav, setFav] = useState(false);
  const [like, setLike] = useState(false);

  const checkFav = () => {
    if (post.favourited.length !== 0) {
      for (let i = 0; i < post.favourited.length; i++) {
        if (post.favourited[i]._id === user._id) {
          setFav(true);
        }
      }
    }
  };

  const checkLike = () => {
    if (post.likes.length !== 0) {
      for (let i = 0; i < post.likes.length; i++) {
        if (post.likes[i]._id === user._id) {
          setLike(true);
        }
      }
    }
  };

  const deletePost = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("id", post._id);
    urlencoded.append("user", user._id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/posts/delete", requestOptions);
      const result = await response.json();
      alert("Post successfully deleted!");
      getPosts(test);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const likePost = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("post", post._id);
    urlencoded.append("user", user._id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/posts/likes", requestOptions);
      const result = await response.json();
      alert("Post successfully liked!");
      getPosts(test);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const removeLike = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("post", post._id);
    urlencoded.append("user", user._id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/posts/removelike", requestOptions);
      const result = await response.json();
      alert("Like successfully removed!");
      getPosts(test);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const addToFavourites = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("post", post._id);
    urlencoded.append("user", user._id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/posts/favourites", requestOptions);
      const result = await response.json();
      alert("Post successfully added to favourites!");
      getPosts(test);
      console.log("hallo")
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const removeFromFavourites = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("post", post._id);
    urlencoded.append("user", user._id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/posts/remove", requestOptions);
      const result = await response.json();
      alert("Post successfully removed from favourites!");
      getPosts(test);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const getComments = async (postId) => {

    let url = postId
    try {
      const response = await fetch(`http://localhost:5000/comments/comment?post=${url}`);
      const result = await response.json();
      setComments(result);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

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
            {post.author && user && <div>
              <Link to={`user-${post.author._id}`} className="link"><h1 className="postUsername">{post.author.username}</h1></Link>
              {post.author.username === user.username && <Link onClick={deletePost}><img src={deleteIcon} alt="delete" title="delete your comment" className="deleteIconPost" /></Link>}
            </div>}
            <p className="postDate">{post.date}</p>
          </div>
        </div>
        <p>{post.text}</p>
        <img src={post.img} alt="post-img" className="imgPreview"></img>
        <div className="likesDiv">
          <div className="likesDiv">
            {!like ? <Link onClick={likePost}><img src={Like} alt="like" title="Like the post!" className="metaIcon" /></Link>
            :
            <Link onClick={removeLike}><img src={Liked} alt="liked" title="Remove the like!" className="metaIcon" /></Link>}
            {post.likes && <p>{post.likes.length} Likes</p>}
          </div>
          {!fav ? <Link onClick={addToFavourites}><img src={Favourite} alt="favourite" title="Add the post to your favourites!" className="metaIcon" /></Link>
            :
            <Link onClick={removeFromFavourites}><img src={Favourited} alt="favourited" title="Remove post from your favourites!" className="metaIcon" /></Link>}
        </div>
        <hr className="hr4"></hr>
        <ShareComment postId={post._id} getComments={getComments} />
        <Comments postId={post._id} comments={comments} getComments={getComments} />
      </div>
    </>
  )
}

export default Post