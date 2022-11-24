import React from 'react';
import NavBar from '../components/NavBar';
import UbahnPic from '../Images/pics/ubahn.jpg';

function Ubahn() {
  return (
      <>
          <NavBar />
          <img src={UbahnPic} alt="U-bahn" className="homePic"></img>
          <h1>You enter the U-Bahn, what do you see?</h1>
      </>
  )
}

export default Ubahn