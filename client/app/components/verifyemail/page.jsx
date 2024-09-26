"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Alert } from '@mui/joy';
import { useRouter } from 'next/navigation'; //changed router to navigation

const EmailVerification = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const verifyEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      // Redirect to homepage after successful verification
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Verification failed. Please try again.');
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');
    console.log(urlToken);
    
    setToken(urlToken || "");
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {verified ? (
        <>
          <Alert color="success">Email verified successfully! Redirecting to homepage...</Alert>
        </>
      ) : error ? (
        <Alert color="danger">{error}</Alert>
      ) : (
        <>
          <Typography level="h4">Verify Your Email</Typography>
          <Button color='success' onClick={verifyEmail}>
            Verify Email
          </Button>
        </>
      )}
    </div>
  );
};

export default EmailVerification;
