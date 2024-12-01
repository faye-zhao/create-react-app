import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="268309604285-7i0ui97posmdulsi5qgf4jrfe043hqt4.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);