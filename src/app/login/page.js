import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
            <Form style={{ width: '60%' }}>
                <div className='mb-3'>
                    <Form.Label className=''>Please enter your email</Form.Label>
                    <Form.Control size="lg" type="email" placeholder="yourname@domain.com..." />
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" className="w-50">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Login;
