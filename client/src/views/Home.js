import React, { useContext, useEffect } from 'react';
import FabGroup from '../components/FabGroup';
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import Skyline from '../Images/pics/skyline.jpg';
import Ubahn from '../Images/logo/ubahn.png';
import City from '../Images/logo/favicon.png';
import '../style/style.css';
import FabGroupHome from '../components/FabGroupHome';

function Home() {

    const { checkIfUserIsLoggedIn } = useContext(AuthContext);

    const actions = [
        { label: "Ubahn", icon: <img src={Ubahn} alt="ubahn" title="Ubahn" style={{width: "40px"}} />, onClick: "/ubahn" },
        { label: "City", icon: <img src={City} alt="city" title="City" style={{ width: "40px" }} />, onClick: "/city" },
    ];
    
    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, []);

  return (
      <>
          <NavBar />
          {/* <FabGroup actions={actions} /> */}
          <FabGroupHome actions={actions} />
          <img src={Skyline} alt="berlin skyline" className="homePic"></img>
          <div>
              <p style={{color: "white", textAlign: "center"}}>Welcome to Berlin Fantastic Creatures!</p>
              <p style={{color: "white", textAlign: "center"}}>Share with all our users the magical you see everyday walking the streets of Berlin.</p>
          </div>
          
      </>
  )
}

export default Home