import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import test from '../Images/profile pics/gustavo.jpg';
import change from '../Images/icon/exchange.png';
import submit from '../Images/icon/arrow.png';
import { Link } from 'react-router-dom';

function PersonalProfile() {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [showInput4, setShowInput4] = useState(false);
  const [showInput5, setShowInput5] = useState(false);

  const [profileChange, setProfileChange] = useState({});

  const handleChangeHandler = (event) => {
    setProfileChange({ ...profileChange, [event.target.name]: event.target.value });
  };

  const changeInfo1 = () => {
    setShowInput1(true);
  };
  const changeInfo2 = () => {
    setShowInput2(true);
  };
  const changeInfo3 = () => {
    setShowInput3(true);
  };
  const changeInfo4 = () => {
    setShowInput4(true);
  };
  const changeInfo5 = () => {
    setShowInput5(true);
  };



    
  return (
  <>
    <NavBar />
      <br /><br />
      <div className="profileDiv">
        <h1 className="profileTitle">My Personal Profile</h1>
        <div>
          <img src={test} alt="profile-pic" className="profilePic"></img>
          <div className="profileInfo">
            <div><h1 className="infoH">Username:</h1>
              <div>{!showInput1 ? <p>Alpha</p> : <input className="profileInput" type="text" name="username" value={profileChange.username} onChange={handleChangeHandler}></input>}
                {!showInput1 ? <Link onClick={changeInfo1}><img className="changeIcon" src={change} alt="change" title="Change your username"></img></Link> :
                  <Link><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>}</div></div>
            <div><h1 className="infoH">First Name:</h1>
              <div>{!showInput2 ? <p>Beta</p> : <input className="profileInput" type="text" name="firstName" value={profileChange.firstName} onChange={handleChangeHandler}></input>}
                {!showInput2 ? <Link onClick={changeInfo2}><img className="changeIcon" src={change} alt="change" title="Change your first name"></img></Link> :
                  <Link><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>}</div></div>
            <div><h1 className="infoH">Last Name:</h1>
              <div>{!showInput3 ? <p>Gamma</p> : <input className="profileInput" type="text" name="lastName" value={profileChange.lastName} onChange={handleChangeHandler}></input>}
                {!showInput3 ? <Link onClick={changeInfo3}><img className="changeIcon" src={change} alt="change" title="Change your last name"></img></Link> :
                  <Link><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>}</div></div>
            <div><h1 className="infoH">Email:</h1>
              <div>{!showInput4 ? <p>test@test.com</p> : <input className="profileInput" type="email" name="email" value={profileChange.email} onChange={handleChangeHandler}></input>}
                {!showInput4 ? <Link onClick={changeInfo4}><img className="changeIcon" src={change} alt="change" title="Change your email"></img></Link> :
                  <Link><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>}</div></div>
            <div><h1 className="infoH">Password:</h1>
              <div>{!showInput5 ? <p>123456</p> : <input className="profileInput" type="password" name="password" value={profileChange.password} onChange={handleChangeHandler}></input>}
                {!showInput5 ? <Link onClick={changeInfo5}><img className="changeIcon" src={change} alt="change" title="Change your password"></img></Link> :
                  <Link><img className="changeIcon" src={submit} alt="change" title="Submit your change"></img></Link>}</div></div>
          </div>
          <div className="profilePosts">
            <h1 className="infoH">Your posts:</h1>
          </div>
          <div className="profileFav">
            <h1 className="infoH">Your favourites:</h1>
          </div>
        </div>
      </div><Button variant="primary" onClick={handleShow}>Your posts</Button>

          

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default PersonalProfile