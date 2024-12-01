import React, { useState } from 'react';
import LoginPage from './LoginPage';
import Trade from './Trade';


const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLogin = (credentialResponse) => {
        console.log("Login Success: ", credentialResponse);
        setLoggedIn(true);
    };
    const handleError = () => {
        console.log("Login Failed");
    };
  return loggedIn ?  ( 
        <Trade />
  ) : (
        <LoginPage onSuccess={handleLogin} onError={handleError}/>
  );
};

export default App;