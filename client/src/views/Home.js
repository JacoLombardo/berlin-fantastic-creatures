import React, { useEffect, useState } from 'react'
import UserInfo from '../components/UserInfo';

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
          <h1>Home</h1>
          {users.map((user, index) => {
              return <UserInfo user={user} key={index} />
          })}
      </>
  )
}

export default Home