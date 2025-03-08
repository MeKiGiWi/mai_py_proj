import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import Registerform from './components/Registerform';

export default function App() {
  return (
    <div className='App'>
      <Registerform/>
    </div>
  );
}
