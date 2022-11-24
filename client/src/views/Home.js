import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import UserInfo from '../components/UserInfo';
import Skyline from '../Images/pics/skyline.jpg';
import '../style/style.css';

function Home() {

    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        fetch("http://localhost:5000/users/all")
            .then(response => response.json())
            .then((result) => {
                console.log(result);
                setUsers(result);
            })
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    
  return (
      <>
          <NavBar />
          <img src={Skyline} alt="berlin skyline" className="homePic"></img>
          <div>
              <p style={{color: "white", textAlign: "center"}}>Welcome to Berlin Fantastic Creatures!</p>
              <p style={{color: "white", textAlign: "center"}}>Share with all our users the magical you see everyday walking the streets of Berlin.</p>
          </div>
          
          {users.map((user, index) => {
              return <UserInfo user={user} key={index} />
          })}
      </>
  )
}

export default Home