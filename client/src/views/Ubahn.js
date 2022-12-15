import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Posts from '../components/Posts/Posts';
import Share from '../components/Posts/Share';
import { AuthContext } from '../context/AuthContext';
import '../style/content.style.css';
import City from '../Images/logo/favicon.png';
import HomeIcon from '../Images/logo/home.png';
import FabGroup from '../components/FabGroup';

function Ubahn() {

  const { user, checkIfUserIsLoggedIn } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const actions = [
    { label: "Home", icon: <img src={HomeIcon} alt="home" title="Home" style={{ width: "40px" }} />, onClick: "/" },
    { label: "City", icon: <img src={City} alt="city" title="City" style={{ width: "40px" }} />, onClick: "/city" },
  ];

  let ubahn = "ubahn";

  const getPosts = async (url) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${url}`);
      const result = await response.json();
      setPosts(result);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  useEffect(() => {
    getPosts(ubahn);
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <>
      <NavBar />
      <FabGroup actions={actions} />
      <br />
        <div className="contentDiv">
        <h1 className="contentTitle">You enter the U-Bahn, what do you see?</h1>
        <hr className="hr3"></hr>
        {user && <Share ubahn={ubahn} getPosts={getPosts} />}
        <Posts ubahn={ubahn} posts={posts} getPosts={getPosts} />
      </div>
    </>
  )
}

export default Ubahn