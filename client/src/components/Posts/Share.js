import React, { useEffect, useState } from 'react';

function Share() {

    const [show, setShow] = useState(false);
    const [newPost, setNewPost] = useState({});
    const [postImg, setPostImg] = useState("");
    
    const previewImg = (event) => {

    };
    
    const handleChangeHandler = (event) => {
        setNewPost({ ...newPost, text: event.target.value });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        uploadPicture();

        setTimeout(() => {
            sharePost();
        }, 5000);
    }

    const sharePost = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    // urlencoded.append("author", user.id);
    urlencoded.append("text", newPost.text);
    urlencoded.append("date", new Date());
    urlencoded.append("img", postImg ? postImg : "");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    
    const response = await fetch("http://localhost:5000/sharepost", requestOptions);
    const result = await response.json();
    console.log("result:", result);
    alert("Post successfully shared!");
  };

  const uploadPicture = async () => {
    var formdata = new FormData();
    formdata.append("image", newPost.image);

    const requestOptions = { method: "POST", body: formdata, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/posts/imageupload", requestOptions);
      const result = await response.json();
      console.log("result", result);
      setPostImg(result.image);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, []);

  return (
      <>
        <div className="postDiv">
          <form>
            <input className="postInputText" type="text" name="post-text" value={newPost.text ? newPost.text : ""} onChange={handleChangeHandler}></input>
            <input className="postInput" type="file" name="img" onChange={previewImg}></input>
            {postImg && <img src={postImg} alt="post-pic"></img>}
            <div>
              <button className="postButton" type="submit" onClick={handleSubmit}>Share!</button>
            </div>
          </form>    
        </div>
      </>
  )
}

export default Share