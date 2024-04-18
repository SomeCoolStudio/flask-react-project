import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const Header = () => {
    return (
        <Container>
            <Row>
                <Col><h1 id='title'>Web Arcade!</h1></Col>
            </Row>
        </Container>
    )
}

export default Header;
