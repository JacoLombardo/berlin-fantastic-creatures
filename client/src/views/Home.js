import React, { useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import Skyline from '../Images/pics/skyline.jpg';
import '../style/style.css';

function Home() {

    const { checkIfUserIsLoggedIn } = useContext(AuthContext);
    
    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, []);

  return (
      <>
          <NavBar />
          <img src={Skyline} alt="berlin skyline" className="homePic"></img>
          <div>
              <p style={{color: "white", textAlign: "center"}}>Welcome to Berlin Fantastic Creatures!</p>
              <p style={{color: "white", textAlign: "center"}}>Share with all our users the magical you see everyday walking the streets of Berlin.</p>
          </div>
          
      </>
  )
}

export default Home