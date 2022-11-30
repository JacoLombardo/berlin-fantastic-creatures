import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './views/Home';
import LogIn from './views/LogIn';
import Register from './views/Register';
import PersonalProfile from './views/PersonalProfile';
import NoMatch from './views/NoMatch';
import Ubahn from './views/Ubahn';
import City from './views/City';
// import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      {/* <AuthContextProvider> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PersonalProfile />} />
          <Route path="/city" element={<City />} />
          <Route path="/ubahn" element={<Ubahn />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      {/* </AuthContextProvider> */}
    </div>
  );
}

export default App;
