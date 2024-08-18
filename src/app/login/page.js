'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Modal, InputGroup } from 'react-bootstrap';
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from './cus_firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showGuestModal, setShowGuestModal] = useState(false);
  const router = useRouter();

  const adminEmail = "admin@abc.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('You have successfully logged in.');
      setError('');

      if (email === adminEmail) {
        router.push('/dashboard'); // Redirect to dashboard if the admin logs in
      } else {
        router.push('/products'); // Redirect non-admin users to products or another page
      }
    } catch (err) {
      setError(`Failed to login: ${err.message}`);
      setMessage('');
    }
  };

  const handleGuestContinue = () => {
    setShowGuestModal(false);
    if (guestName) {
      router.push('/products'); // Redirect guest user to products page
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === adminEmail) {
          router.push('/dashboard');
        } else {
          router.push('/products');
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="login-page" style={styles.container}>
      <div className="login-card" style={styles.card}>
        <h1 className="text-center mb-4" style={styles.title}>Sign in with email</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <InputGroup>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </InputGroup>
          </Form.Group>

          <Button variant="primary" className="w-100" type="submit" style={styles.button}>
            Get Started
          </Button>
        </Form>

        <div style={{marginTop:'4%', fontWeight:'800'}}>
          OR
        </div>

        <Button variant="secondary" className="mt-3 w-100" onClick={() => setShowGuestModal(true)} style={styles.guestButton}>
          Continue as Guest
        </Button>

        {message && <p className="text-success text-center mt-3">{message}</p>}
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>

      {/* Guest Name Modal */}
      <Modal show={showGuestModal} onHide={() => setShowGuestModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Continue as Guest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="guestName">
            <Form.Label>Enter your name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your name..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGuestModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleGuestContinue}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa', // Subtle light background color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    padding: '40px',
    borderRadius: '25px', // Softer corners for the card
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency to blend with background
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Soft and larger shadow
    textAlign: 'center',
    backdropFilter: 'blur(10px)', // Blur effect for a modern frosted-glass look
  },
  title: {
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  input: {
    borderRadius: '10px',
    height: '50px',
    borderColor: '#ddd',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)', // Subtle inner shadow
    padding: '10px 15px',
    fontSize: '16px',
    marginLeft: '5px',
  },
  inputGroupText: {
    borderRadius: '10px 0 0 10px',  // Match the input border radius
    backgroundColor: '#fff',  // Same background color as the input
    border: 'none',  // Remove the border
    padding: '10px 12px',  // Adjust padding for alignment
    color: '#888',  // Subtle icon color
  },
  button: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
    color: '#fff',
    padding: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '10px',
    transition: 'background-color 0.3s ease',
    maxWidth: '60%' 
  },
  guestButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '10px',
    transition: 'background-color 0.3s ease',
    maxWidth: '60%' 
  },
  iconButton: {
    backgroundColor: '#f7f7f7',
    border: '1px solid #ddd',
    padding: '12px', 
    borderRadius: '50%',
    transition: 'transform 0.3s ease', // Scale effect on hover
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  link: {
    color: '#4A90E2',
    textDecoration: 'none',
    fontSize: '14px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};



export default Login;
