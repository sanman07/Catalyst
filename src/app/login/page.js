'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button } from 'react-bootstrap';
 // Adjust the import path based on your project structure
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from './cus_firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const adminEmail = "admin@abc.com"; // Replace with the actual admin email or UID
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

  // Optional: Redirect already logged-in users based on their role
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

    return() =>unsubscribe();
  }, [router]);

  return (
    <div className='d-flex justify-content-center align-items-center'style={{minHeight: '100vh' }}><Form style={{ width: '60%' }} onSubmit={handleSubmit}><div className='mb-3'><Form.Label>Please enter your email</Form.Label><Form.Control
            size="lg"
            type="email"
            placeholder="yourname@domain.com..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div><div className='mb-3'><Form.Label>Please enter your password</Form.Label><Form.Control
            size="lg"
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><div className="d-flex justify-content-center"><Button variant="primary" className="w-50" type="submit">
            Submit
          </Button></div>
        {message && <p className="text-success text-center mt-3">{message}</p>}
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </Form></div>
  );
};

export default Login;
