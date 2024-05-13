import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from '../../contexts/UserContext';


export const LoginForm = () => {

  const [userLogin, setUserLogin] = useState({ username: '', password: '' });
  const { user, setUser } = useContext(UserContext)
  
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin.username) {
      LoginUser();
      // setUserLogin(delete userLogin.username, delete userLogin.password)
    }
  }, [userLogin])

  async function LoginUser() {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userLogin)
    })
    if (res.ok) {
      const { access_token } = await res.json();
      console.log(access_token);
      setUser({ ...userLogin, accessToken: access_token })
      toast('logged in!')
      navigate('/game-page');
    } else {
      toast.error('Login Failed', {position:"top-right"})
      console.error("Login Failed")
    }
  }


  function HandleLoginFormSubmit(e) {
    e.preventDefault();

    const loginElement = e.currentTarget;
    const loginForm = new FormData(loginElement);
    setUserLogin(Object.fromEntries(loginForm));
  }

  return (
    <Form id='text-for-login' onSubmit={HandleLoginFormSubmit}>
      
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control name="username" type="username" placeholder="Username" required />
      </Form.Group >
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" required />
      </Form.Group>
      <Button id='login-btn' variant="primary" type="submit">Login</Button>
      <Button as={Link} to='/register' id='create-account-btn' variant="primary" type="button">Create Account</Button>
    </Form >
  )
}

export default LoginForm;   
