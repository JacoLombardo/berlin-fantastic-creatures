import React, { useEffect, useState } from 'react';
import CityImage from '../components/City/CityImage';
import NavBar from '../components/NavBar';

function City() {

  const [show, setShow] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 5000);
  }, [])
  
  return (
    <>
      <NavBar />
      {!show && <CityImage />}
      {show && <p>Here</p>}
    </>
  )
}

export default City