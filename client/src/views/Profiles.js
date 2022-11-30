import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import test from '../Images/profile pics/gustavo.jpg';

function Profiles() {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
  return (
  <>
    <NavBar />
      <br /><br />
      <div className="profileDiv">
        <h1 className="profileTitle">My Personal Profile</h1>
        <div>
            <img src={test} alt="profile-pic" className="profilePic"></img>
            <div className="profileInfo">
                <div><h1 className="infoH">Username:</h1><p>Alpha</p></div>
                <div><h1 className="infoH">First Name:</h1><p>Beta</p></div>
                <div><h1 className="infoH">Last Name:</h1><p>Gamma</p></div>
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

export default Profiles