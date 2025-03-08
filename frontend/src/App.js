import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/> 
      <Route path='/registration' element={<RegisterPage/>}/>
    </Routes>
  );
}
