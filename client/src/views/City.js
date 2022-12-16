import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Posts from '../components/Posts/Posts';
import Share from '../components/Posts/Share';
import { AuthContext } from '../context/AuthContext';
import Ubahn from '../Images/logo/ubahn.png';
import HomeIcon from '../Images/logo/home.png';
import FabGroup from '../components/FabGroup';

function City() {

  const { user, checkIfUserIsLoggedIn, server } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const actions = [
    { label: "Home", icon: <img src={HomeIcon} alt="home" title="Home" style={{ width: "40px" }} />, onClick: "/" },
    { label: "Ubahn", icon: <img src={Ubahn} alt="ubahn" title="Ubahn" style={{ width: "40px" }} />, onClick: "/ubahn" },
  ];

  let city = "city";

  const getPosts = async (url) => {
    try {
      const response = await fetch(`${server}/api/posts/${url}`);
      const result = await response.json();
      setPosts(result);
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  useEffect(() => {
    getPosts(city);
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <>
      <NavBar />
      <FabGroup actions={actions} />
      <br />
      <div className="contentDiv">
        <h1 className="contentTitle">You walk around the city, does something catch your attention?</h1>
        <hr className="hr3"></hr>
        {user && <Share city={city} getPosts={getPosts} />}
        <Posts city={city} posts={posts} getPosts={getPosts} />
      </div>
    </>
  )
}

export default City