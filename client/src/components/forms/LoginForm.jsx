import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const LoginForm = () => {
  return (
    <Form id='text'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button id='login-btn' variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default LoginForm; 
