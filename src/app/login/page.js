'use client';

import { useEffect, useState } from 'react';
import { auth, signInWithEmailLink, isSignInWithEmailLink } from './cus_firebase'; // Ensure correct path

const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoginComplete, setIsLoginComplete] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get('sessionId');
    const storedEmail = window.localStorage.getItem('emailForSignIn');

    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, storedEmail, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          // Notify the original page about the successful login
          window.opener?.postMessage({ sessionId, status: 'success' }, '*');
          setIsLoginComplete(true);
        })
        .catch((error) => {
          setError('Error signing in: ' + error.message);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get('sessionId');

    const actionCodeSettings = {
      url: `${window.location.origin}/qr-login?sessionId=${sessionId}`, // Redirect to QR login handler
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
    <div><h2>Email Login</h2>
      {!isLoginComplete ? (
        <form onSubmit={handleSubmit}><input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Login Link</button></form>
      ) : (
        <p>Login complete! You can close this window.</p>
      )}
      {message && <p>{message}</p>}
      {error && <p style={{color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EmailLogin;
