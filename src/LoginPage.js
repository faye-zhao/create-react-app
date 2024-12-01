import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = ({ onSuccess, onError }) => {
  return (
    <div>
      <h1>Sign in with Google</h1>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
};

export default LoginPage;