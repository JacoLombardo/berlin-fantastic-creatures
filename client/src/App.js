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
import { AuthContextProvider } from './context/AuthContext';
import Profiles from './views/Profiles';
import { ContentContextProvider } from './context/ContentContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <ContentContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><PersonalProfile /></ProtectedRoute>} />
          <Route path="/city/user-:id" element={<Profiles />} />
          <Route path="/ubahn/user-:id" element={<Profiles />} />
          <Route path="/city" element={<City />} />
          <Route path="/ubahn" element={<Ubahn />} />
          <Route path="*" element={<NoMatch />} />
          </Routes>
          </ContentContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
