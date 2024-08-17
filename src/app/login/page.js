'use client';

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { auth } from './cus_firebase'; // Adjust the import path based on your project structure
import { sendSignInLinkToEmail } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actionCodeSettings = {
      url: 'http://localhost:3000/products', // Update this URL to match your app's domain
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('A login link has been sent to your email.');
      setError('');
    } catch (err) {
      setError(`Failed to send login link: ${err.message}`);
      setMessage('');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
      <Form style={{ width: '60%' }} onSubmit={handleSubmit}>
        <div className='mb-3'>
          <Form.Label>Please enter your email</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            placeholder="yourname@domain.com..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="primary" className="w-50" type="submit">
            Submit
          </Button>
        </div>
        {message && <p className="text-success text-center mt-3">{message}</p>}
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </Form>
    </div>
  );
};

export default Login;
