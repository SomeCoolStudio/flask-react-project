import { useContext } from 'react'

import Container from 'react-bootstrap/Container'
import NavLink from 'react-bootstrap/NavLink'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'

import { UserContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'

export default function Header() {

  const { user } = useContext (UserContext)

  const logout_toast = (e)=>{
    e.preventDefault;
    toast('logged out');

  }

  return (
    <Navbar data-bs-theme='dark' className='main-heading' sticky='top' onClick={logout_toast}>
      <Container>
        <Navbar.Brand>Escape Reality Protocol Initiated...</Navbar.Brand>
        {
          !user.accessToken ?
            <>
              <NavLink as={Link} to={'/register'}>Register</NavLink>
              <NavLink as={Link} to={'/'}>Login</NavLink>
            </> :
            <NavLink as={Link} to={'/logout'}>Logout</NavLink>
        }
      </Container>
    </Navbar>
  )
}