// 1. Import hook
import React, { createContext } from 'react';


// 2. Create Context / Store

export const ContentContext = createContext();

// 3. Create provider
export const ContentContextProvider = (props) => {

  const deleteImage = async (img_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
    const urlencoded = new URLSearchParams();
    urlencoded.append("img_id", img_id);
    
    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/users/imagedelete", requestOptions);
      await response.json();
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const likePost = async (post, user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("post", post);
    urlencoded.append("user", user);

    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/posts/likes", requestOptions);
      await response.json();
      alert("Post successfully liked!");
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const removeLike = async (post, user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("post", post);
    urlencoded.append("user", user);

    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/posts/removelike", requestOptions);
      await response.json();
      alert("Like successfully removed!");
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const addToFavourites = async (post, user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("post", post);
    urlencoded.append("user", user);

    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/posts/favourites", requestOptions);
      await response.json();
      alert("Post successfully added to favourites!");
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const removeFromFavourites = async (post, user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("post", post);
    urlencoded.append("user", user);

    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/posts/remove", requestOptions);
      await response.json();
      alert("Post successfully removed from favourites!");
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const likeComment = async (comment, user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("comment", comment);
    urlencoded.append("user", user);

    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/comments/likes", requestOptions);
      await response.json();
      alert("Post successfully liked!");
      
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const removeLikeComment = async (comment, user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("comment", comment);
    urlencoded.append("user", user);

    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/api/comments/removelike", requestOptions);
      await response.json();
      alert("Like successfully removed!");
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  // 4. Move state and function

  return (
    <ContentContext.Provider value={{ deleteImage, likePost, removeLike, addToFavourites, removeFromFavourites, likeComment, removeLikeComment }}>{props.children}</ContentContext.Provider>
  );
};
