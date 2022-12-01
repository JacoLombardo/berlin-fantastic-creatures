import React, { useEffect, useState } from 'react';

function Share() {

  // const [show, setShow] = useState(false);
  const [newPost, setNewPost] = useState({});
  // const [postImg, setPostImg] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [imgDataURL, setImgDataURL] = useState(null);

  const consoleL = (event) => {
    event.preventDefault();
    // console.log(postImg);
  }

  const previewImg = (event) => {
    setPreviewFile(event.target.files[0]);
  };

    
  const handleChangeHandler = (event) => {
    setNewPost({ ...newPost, text: event.target.value });
  };
    
  const handleSubmit = (event) => {
    event.preventDefault();
    uploadPicture();

    // setTimeout(() => {
    //   sharePost();
    // }, 5000);
  };

  const sharePost = async (postImg) => {

    console.log("BBB", postImg)
      
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    // urlencoded.append("author", user.id);
    urlencoded.append("text", newPost.text);
    urlencoded.append("date", new Date());
    urlencoded.append("img", postImg);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    
    const response = await fetch("http://localhost:5000/posts/share", requestOptions);
    const result = await response.json();
    console.log("result:", result);
    alert("Post successfully shared!");
  };

  const uploadPicture = async () => {
    var formdata = new FormData();
    formdata.append("image", previewFile);

    const requestOptions = { method: "POST", body: formdata, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/posts/imageupload", requestOptions);
      const result = await response.json();
      console.log("result", result);
      sharePost(result.image);
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShow(true);
  //   }, 3000);
  // }, []);

  return (
      <>
        <div className="postDiv">
          <form>
            <textarea className="postInputText" type="text" name="post-text" value={newPost.text ? newPost.text : ""} onChange={handleChangeHandler}></textarea>
            <input className="postInput" type="file" accept="image/*" name="img" onChange={previewImg}></input>
            {imgDataURL && <img src={imgDataURL} alt="post-pic" className="imgPreview"></img>}
            <div>
              <button className="postButton" type="submit" onClick={handleSubmit}>Share!</button>
              <button type="submit" onClick={consoleL}>AAA</button>
            </div>
          </form>    
        </div>
      </>
  )
}

export default Share