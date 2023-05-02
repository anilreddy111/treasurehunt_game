import React from 'react';
import Hangman from './components/Hangman'
import { Routes, Route } from 'react-router-dom'
import Navigate from './components/Navigate';
import Map from './components/Map';
import Home from './components/Home';
import Lost from './components/Lost';
import Won from './components/Won';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Navigate path={localStorage.getItem("token")?"home":"login"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/first" element={<Map />} />
        <Route path="/second" element={<Hangman />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/won" element={<Won />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
