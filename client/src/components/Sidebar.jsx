import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Sidebar() {
    return (
        <div>
        <Navbar>
            <Container id='sidebar'>
                <Nav.Item>
                    <Nav.Link>Games</Nav.Link>
                </Nav.Item>
                <br />
                <Nav.Item>
                    <Nav.Link>My Page</Nav.Link>
                </Nav.Item>
                <br />
                <Nav.Item>
                    <Nav.Link>Contact</Nav.Link>
                </Nav.Item>
            </Container>
        </Navbar>
        </div>
    );
}