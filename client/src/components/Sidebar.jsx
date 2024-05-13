import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


export default function Sidebar() {
    return (
        
        <Container id='sidebar'>
                <Link to='/'>Login</Link>
                <br />
                <Link to='/register'>Create Account</Link>
        </Container>
        
    );
}