import React from 'react';
import NavBar from '../components/NavBar';
import CityPic from '../Images/pics/street.jpg';

function City() {
  return (
      <>
          <NavBar />
          <img src={CityPic} alt="Street" className="homePic"></img>
      </>
  )
}

export default City