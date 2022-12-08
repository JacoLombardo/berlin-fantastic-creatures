import React, { useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import Skyline from '../Images/pics/skyline.jpg';
import '../style/style.css';
import getToken from '../tools/getToken';

function Home() {

    const { user, logout } = useContext(AuthContext);

    const validateToken = async () => {
        const token = getToken();
        if (token) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            const requestOptions = { method: "GET", headers: myHeaders, redirect: "follow" };
            try {
                const response = await fetch("http://localhost:5000/users/profile", requestOptions);
                const result = await response.json();
            } catch (error) {
                console.log("error validating", error);
                if (error) {
                    logout();
                };
            };
        };
    };

    useEffect(() => {
        if (user) {
           validateToken(); 
        };
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