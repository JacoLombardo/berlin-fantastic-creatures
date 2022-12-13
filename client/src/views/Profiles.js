import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PersonalPosts from '../components/PersonalInfo/PersonalPosts';
import Favourites from '../components/Favourites/Favourites';
import favourite from '../Images/icon/favourite.png';
import post from '../Images/icon/post.png';
import Logo from '../components/Logo/Logo';

function Profiles() {

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { user, checkIfUserIsLoggedIn } = useContext(AuthContext);
  const { id } = useParams();

  const getProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/user?_id=${id}`);
      const result = await response.json();
      setProfile(result);
      setLoading(false);
    } catch (error) {
      console.log("Error getting profile", error);
    }
  };

  useEffect(() => {
    getProfile();
    checkIfUserIsLoggedIn();
  }, []);
    
  return (
    <>
    {user && id === user._id && <Navigate to="/profile" />}
    <NavBar />
      <br />
      {loading ? 
        <Logo />
        :
      <div className="profileDiv">
        <h1 className="profileTitle">Personal profile of {profile.username}</h1>
        <div>
            <img src={profile.profilePic} alt="profile-pic" className="profilePic"></img>
            <div>
            <div className="profileInfo">
                <div><h1 className="infoH">Username:</h1><p>{profile.username}</p></div>
                <div><h1 className="infoH">First Name:</h1><p>{profile.firstName}</p></div>
              <div><h1 className="infoH">Last Name:</h1><p>{profile.lastName}</p></div>
            </div>
            {profile.bio &&
              <div className="profileInfo">
                <h1 className="infoH">Their bio</h1>
                <p className="profileBio">{profile.bio}</p>
                </div>}
              </div>
          <div className="profilePosts">
            <div className="profileIconDiv">
              <img src={post} alt="favourites" className="profileMetaIcon" />
              <h1 className="infoH">Their posts:</h1>
            </div>
            <PersonalPosts userId={id} />
          </div>
          <div className="profileFav">
            <div className="profileIconDiv">
              <img src={favourite} alt="favourites" className="profileMetaIcon" />
              <h1 className="infoH">Their favourites:</h1>
            </div>
            <Favourites userId={id} />
          </div>
        </div>
        </div>
      }
    </>
  )
}

export default Profiles