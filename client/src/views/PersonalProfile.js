import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import change from '../Images/icon/exchange.png';
import submit from '../Images/icon/arrow.png';
import back from '../Images/icon/back.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PersonalPosts from '../components/PersonalInfo/PersonalPosts';
import Favourites from '../components/Favourites/Favourites';
import favourite from '../Images/icon/favourite.png';
import post from '../Images/icon/post.png';
import '../style/profile.style.css';
import { ContentContext } from '../context/ContentContext';
import Logo from '../components/Logo/Logo';

function PersonalProfile() {

  const { user, getPersonalProfile, logout, checkIfUserIsLoggedIn } = useContext(AuthContext);
  const { deleteImage } = useContext(ContentContext);
  const [previewFile, setPreviewFile] = useState(null);
  const [imgDataURL, setImgDataURL] = useState(null);
  const [errors, setErrors] = useState(null);

  let blankPic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";

  const username = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const bio = useRef();

  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [showInput4, setShowInput4] = useState(false);
  const [showInput5, setShowInput5] = useState(false);
  const [showInput6, setShowInput6] = useState(false);
  const [showInput7, setShowInput7] = useState(false);

  const deleteAccount = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
    const urlencoded = new URLSearchParams();
    urlencoded.append("user", user._id);
    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/users/delete", requestOptions);
      await response.json();
      logout();
    } catch (error) {
      console.log("error :>> ", error);
    };
  };

  const submitChange = async (profilePic, img_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
    const urlencoded = new URLSearchParams();
    urlencoded.append("id", user._id);
    if (username.current) { urlencoded.append("username", username.current.value);
    } if (firstName.current) { urlencoded.append("firstName", firstName.current.value);
    } if (lastName.current) { urlencoded.append("lastName", lastName.current.value);
    } if (bio.current) { urlencoded.append("bio", bio.current.value);
    } if (email.current) { urlencoded.append("email", email.current.value);
    } if (password.current) { urlencoded.append("password", password.current.value);
    } if (profilePic) {
      urlencoded.append("profilePic", profilePic);
      urlencoded.append("img_id", img_id)
    };
    
    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/users/update", requestOptions);
      const result = await response.json();
      if (result.errors) {
        setErrors(result.errors);
      } else if (!result.errors) {
        setShowInput1(false);
        setShowInput4(false);
        setErrors(null);
      };
    } catch (error) {
      console.log("error :>> ", error);
    };
    getPersonalProfile();
  };

  const uploadPicture = async () => {
    var formdata = new FormData();
    formdata.append("image", previewFile);

    const requestOptions = { method: "POST", body: formdata, redirect: "follow" };
    try {
      const response = await fetch("http://localhost:5000/users/imageupload", requestOptions);
      const result = await response.json();
      deleteImage(user.img_id);
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
    checkIfUserIsLoggedIn();
  }, []);

  return (
  <>
    <NavBar />
      <br />
      {user ?
        <div className="profileDiv">
          <h1 className="profileTitle">My Personal Profile</h1>
          <div>
            <div className="profileImgDiv">
              {!showInput6 ? <Link onClick={() => { setShowInput6(true) }}><img className="changeIconImg" src={change} alt="change" title="Change your profile picture"></img></Link>
                :
                <div className="backSubmitDiv">
                  <Link onClick={() => { setImgDataURL(null); setShowInput6(false) }}><img className="changeIconImg1" src={back} alt="change" title="Discard your change"></img></Link>
                  <Link onClick={() => { uploadPicture(); setShowInput6(false) }}><img className="changeIconImg1" src={submit} alt="change" title="Submit your change"></img></Link>
                </div>}
              {imgDataURL ? <img src={imgDataURL} alt="post-pic" className="profilePic" /> : <img src={user.profilePic} alt="profile-pic" className="profilePic" />}
              {showInput6 && <input className="profileImgInput" type="file" accept="image/*" name="img" onChange={(event) => { setPreviewFile(event.target.files[0]) }} />}
              {!showInput6 && user.profilePic === blankPic && <p style={{ fontStyle: "italic" }}>Add a profile picture!</p>}
            </div>
            <div>
              <div className="profileInfo">
                <div>
                  <h1 className="infoH">Username:</h1>
                  <div className="actionIconsDiv">
                    <div className="profileMessageError">
                      {!showInput1 ? <p>{user.username}</p>
                        : <input className="profileInput" type="text" name="username" ref={username} defaultValue={user.username}></input>}
                      {errors && errors.msg === "Username already in use" && <p className="errorMessage">{errors.msg}</p>}
                    </div>
                    {!showInput1 ? <Link onClick={() => { setShowInput1(true) }}><img className="changeIcon" src={change} alt="change" title="Change your username"></img></Link>
                      :
                      <div>
                        <Link onClick={() => { setShowInput1(false) }}><img className="changeIcon" src={back} alt="change" title="Discard your change"></img></Link>
                        <Link onClick={() => { submitChange() }}><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>
                      </div>}
                  </div>
                </div>
                <div>
                  <h1 className="infoH">First Name:</h1>
                  <div className="actionIconsDiv">{!showInput2 ? <p>{user.firstName}</p> : <input className="profileInput" type="text" name="firstName" ref={firstName} defaultValue={user.firstName}></input>}
                    {!showInput2 ? <Link onClick={() => { setShowInput2(true) }}><img className="changeIcon" src={change} alt="change" title="Change your first name"></img></Link>
                      :
                      <div>
                        <Link onClick={() => { setShowInput2(false) }}><img className="changeIcon" src={back} alt="change" title="Discard your change"></img></Link>
                        <Link onClick={() => { submitChange(); setShowInput2(false) }}><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>
                      </div>}
                  </div>
                </div>
                <div>
                  <h1 className="infoH">Last Name:</h1>
                  <div className="actionIconsDiv">{!showInput3 ? <p>{user.lastName}</p> : <input className="profileInput" type="text" name="lastName" ref={lastName} defaultValue={user.lastName}></input>}
                    {!showInput3 ? <Link onClick={() => { setShowInput3(true) }}><img className="changeIcon" src={change} alt="change" title="Change your last name"></img></Link>
                      :
                      <div>
                        <Link onClick={() => { setShowInput3(false) }}><img className="changeIcon" src={back} alt="change" title="Discard your change"></img></Link>
                        <Link onClick={() => { submitChange(); setShowInput3(false) }}><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>
                      </div>}
                  </div>
                </div>
                <div>
                  <h1 className="infoH">Email:</h1>
                  <div className="actionIconsDiv">
                    <div className="profileMessageError">
                      {!showInput4 ? <p>{user.email}</p> : <input className="profileInput" type="email" name="email" ref={email} defaultValue={user.email}></input>}
                      {errors && errors.msg === "Email already in use" && <p className="errorMessage">{errors.msg}</p>}
                    </div>
                    {!showInput4 ? <Link onClick={() => { setShowInput4(true) }}><img className="changeIcon" src={change} alt="change" title="Change your email"></img></Link>
                      :
                      <div>
                        <Link onClick={() => { setShowInput4(false) }}><img className="changeIcon" src={back} alt="change" title="Discard your change"></img></Link>
                        <Link onClick={() => { submitChange() }}><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>
                      </div>}
                  </div>
                </div>
                <div>
                  <h1 className="infoH">Password:</h1>
                  <div className="actionIconsDiv">{!showInput5 ? <p>●●●●●●</p> : <input className="profileInput" type="password" name="password" ref={password}></input>}
                    {!showInput5 ? <Link onClick={() => { setShowInput5(true) }}><img className="changeIcon" src={change} alt="change" title="Change your password"></img></Link>
                      :
                      <div>
                        <Link onClick={() => { setShowInput5(false) }}><img className="changeIcon" src={back} alt="change" title="Discard your change"></img></Link>
                        <Link onClick={() => { submitChange(); setShowInput5(false) }}><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>
                      </div>}
                  </div>
                </div>
              </div>
              <div className="profileInfo">
                {user.bio ?
                  <div className="profileImgDiv">
                    <div className="bioIconDiv">
                      <h1 className="infoH">Your bio</h1>
                      {!showInput7 ? <Link onClick={() => { setShowInput7(true) }}><img className="changeIcon" src={change} alt="change" title="Change your bio"></img></Link>
                        :
                        <div>
                          <Link onClick={() => { setShowInput7(false) }}><img className="changeIcon" src={back} alt="change" title="Discard your change"></img></Link>
                          <Link onClick={() => { submitChange(); setShowInput7(false) }}><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>
                        </div>}
                    </div>
                    {showInput7 ? <textarea className="bioInputText" type="text" name="bio-text" ref={bio} defaultValue={user.bio} />
                      : <p className="profileBio">{user.bio}</p>}
                  </div>
                  :
                  <div className="profileImgDiv">
                    <div className="bioIconDiv">
                      <p style={{ fontStyle: "italic" }}>You have no bio yet, add one!</p>
                      {!showInput7 ? <Link onClick={() => { setShowInput7(true) }}><img className="changeIcon" src={change} alt="change" title="Add a bio"></img></Link>
                        :
                        <div>
                          <Link onClick={() => { setShowInput7(false) }}><img className="changeIcon" src={back} alt="change" title="Discard your change"></img></Link>
                          <Link onClick={() => { submitChange(); setShowInput7(false) }}><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>
                        </div>}
                    </div>
                    {showInput7 && <textarea className="bioInputText" type="text" name="bio-text" ref={bio} />}
                  </div>}
              </div>
            </div>
            <div className="profilePosts">
              <div className="profileIconDiv">
                <img src={post} alt="favourites" className="profileMetaIcon" />
                <h1 className="infoH">Your posts:</h1>
              </div>
              <PersonalPosts userId={user._id} />
            </div>
            <div className="profileFav">
              <div className="profileIconDiv">
                <img src={favourite} alt="favourites" className="profileMetaIcon" />
                <h1 className="infoH">Your favourites:</h1>
              </div>
              <Favourites user={user} />
            </div>
          </div>
          <br /><br />
          <button className="deleteButton" onClick={deleteAccount}>Delete account</button>
        </div>
        :
        <Logo />}
      </>
  )
}

export default PersonalProfile