// import axios from 'axios';
import Container from 'react-bootstrap/Container'

import { useState, useEffect } from 'react';

import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';



export default function App() {


  // const fetchAPI = async () => {
  //   const response = await axios.get("http://127.0.0.1:5000/api/users");
  //   console.log(response.data.users);
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  return ( 
    <Container>
      <RegisterPage />
    </Container>
  )
}

