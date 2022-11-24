import React from 'react';
import { Navigate } from 'react-router-dom';

function NoMatch() {
  return (
    <Navigate to="/" />
  )
}

export default NoMatch