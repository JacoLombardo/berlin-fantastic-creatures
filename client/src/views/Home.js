import React, { useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import Skyline from '../Images/pics/skyline.jpg';
import '../style/style.css';
import FabGroupHome from '../components/FabGroupHome';

function Home() {

    const { checkIfUserIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, []);

  return (
      <>
          <NavBar />
          <FabGroupHome />
          <img src={Skyline} alt="berlin skyline" className="homePic"></img>
          <div>
              <p className="homeTextTop">Welcome</p>
              <p className="homeTextTop2">to</p>
              <p className="homeTextBottom">Share with us the magical you see everyday walking the streets of Berlin!</p>
          </div>
          <h1 className="test">
              <span className="char1">B</span>
              <span className="char2">e</span>
              <span className="char3">r</span>
              <span className="char4">l</span>
              <span className="char5">i</span>
              <span className="char6">n</span>
              <span className="char7"> </span>
              <span className="char8">F</span>
              <span className="char9">a</span>
              <span className="char10">n</span>
              <span className="char11">t</span>
              <span className="char12">a</span>
              <span className="char13">s</span>
              <span className="char14">t</span>
              <span className="char15">i</span>
              <span className="char16">c</span>
              <span className="char17"> </span>
              <span className="char18">C</span>
              <span className="char19">r</span>
              <span className="char20">e</span>
              <span className="char21">a</span>
              <span className="char22">t</span>
              <span className="char23">u</span>
              <span className="char24">r</span>
              <span className="char25">e</span>
              <span className="char26">s</span>
          </h1>
          
      </>
  )
}

export default Home