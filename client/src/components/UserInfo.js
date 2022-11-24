import React from 'react'

function UserInfo({user}) {
  return (
      <>
          <p>Username: {user.username}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
      </>
  )
}

export default UserInfo