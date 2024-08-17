// src/app/qr-login/page.js
'use client';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Button } from 'react-bootstrap';
import { auth, sendSignInLinkToEmail } from './cus_firebase'; // Adjust the path if necessary // Ensure this path is correct
const QRLogin = () => {
  const [email, setEmail] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const uniqueSessionId = `session-${Date.now()}`;
    setSessionId(uniqueSessionId);
    const url = `${window.location.origin}/login?sessionId=${uniqueSessionId}`;
    setQrUrl(url);
  }, []);

  const handleManualLogin = async () => {
    const actionCodeSettings = {
      url: `${window.location.origin}/qr-login?sessionId=${sessionId}`,
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
  

  useEffect(() => {
    if (!sessionId) return;

    const handleMessage = (event) => {
      if (event.data.sessionId === sessionId && event.data.status === 'success') {
        setIsLoggedIn(true);
        setMessage('Successfully logged in!');
      }
    };

    window.addEventListener('message', handleMessage);
    return() =>window.removeEventListener('message', handleMessage);
  }, [sessionId]);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'style={{minHeight: '100vh' }}>
      {!isLoggedIn ? (
        <><div className='mb-3'><QRCode value={qrUrl} size={256} /></div><p>Scan this QR code with your mobile device to log in.</p><div><input
              type='email'
              placeholder='yourname@domain.com...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button onClick={handleManualLogin}>Send Login Link</Button></div></>
      ) : (
        <p className='text-success'>You are now logged in!</p>
      )}
      {message && <p className='text-success text-center mt-3'>{message}</p>}
      {error && <p className='text-danger text-center mt-3'>{error}</p>}
    </div>
  );
};

export default QRLogin;
