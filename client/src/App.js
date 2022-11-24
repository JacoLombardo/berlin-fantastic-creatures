import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './views/Home';
import LogIn from './views/LogIn';
import Register from './views/Register';
import Profile from './views/Profile';
import NoMatch from './views/NoMatch';
import Ubahn from './views/Ubahn';
import City from './views/City';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/city" element={<City />} />
        <Route path="/ubahn" element={<Ubahn />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
