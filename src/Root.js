import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Profile from './components/Profile';
import Login from './components/Auth/Login';

const Root = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/profile/*" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
};

export default Root;