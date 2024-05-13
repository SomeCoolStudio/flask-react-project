// import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Container from 'react-bootstrap/Container'

import { useState, useEffect } from 'react';

import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/forms/LoginForm';
import GamePage from './pages/GamePage';
import Logout from './components/Logout';


export default function App() {


  return (
    <Container >
      <ToastContainer position="top-left" theme='light' />
      <Routes>
        {/* <Route path='/' element={<LandingPage />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/register' element={<RegisterPage />}/> */}
        <Route path='/' element={<GamePage />}/>
      </Routes>
    </Container>
  )
}

