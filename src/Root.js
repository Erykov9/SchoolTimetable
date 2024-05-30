import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Profile from './components/Profile';

const Root = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/profile/*" element={<Profile/>} />
      </Routes>
    </div>
  );
};

export default Root;