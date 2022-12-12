import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Posts from '../components/Posts/Posts';
import Share from '../components/Posts/Share';
import { AuthContext } from '../context/AuthContext';

function City() {

  const { user, checkIfUserIsLoggedIn } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  let city = "city";

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
    getPosts(city);
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <>
      <NavBar />
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