import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import UbahnImage from '../components/Ubahn/UbahnImage';
import Post from '../components/Posts/Post'
import Posts from '../components/Posts/Posts';
import Share from '../components/Posts/Share';

function Ubahn() {

  const [show, setShow] = useState(false);


  return (
    <>
      <NavBar />
      {/* {!show && <UbahnImage />} */}
      <br />
      {/* {show && */}
        <div className="contentDiv">
        <h1 className="contentTitle">You enter the U-Bahn, what do you see?</h1>
        <hr className="hr3"></hr>
        <Share />
        
        <Posts />
      </div>
      {/* } */}
    </>
  )
}

export default Ubahn