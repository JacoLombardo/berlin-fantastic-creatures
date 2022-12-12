import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from '../components/Logo/Logo';

function ProtectedRoute({ children }) {

    const { loading, isUser, checkIfUserIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, []);

    return (
        <>
            {loading ?
                (<div className="loaderDiv">
                    <Logo />
                </div>) : (
                    isUser ? children : <Navigate to="/" />
                )}
        </>
  )
}

export default ProtectedRoute