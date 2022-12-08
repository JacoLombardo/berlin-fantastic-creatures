import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Posts from '../components/Posts/Posts';
import Share from '../components/Posts/Share';
import { AuthContext } from '../context/AuthContext';
import '../style/content.style.css';

function Ubahn() {

  const { isUser, getPersonalProfile } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  let ubahn = "ubahn";

  useEffect(() => {
    getPersonalProfile();
  }, []);

  

  const getPosts = async (url) => {

    try {
      const response = await fetch(`http://localhost:5000/posts/${url}`);
      const result = await response.json();
      setPosts(result);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  useEffect(() => {
    getPosts(ubahn);
  }, []);

  return (
    <>
      <NavBar />
      <br />
        <div className="contentDiv">
        <h1 className="contentTitle">You enter the U-Bahn, what do you see?</h1>
        <hr className="hr3"></hr>
        {isUser && <Share ubahn={ubahn} getPosts={getPosts} />}
        <Posts ubahn={ubahn} posts={posts} getPosts={getPosts} />
      </div>
    </>
  )
}

export default Ubahn