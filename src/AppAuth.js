import React, { useState } from 'react';
import LoginForm from './LoginForm';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
      setUser(userData);
      // In a real app, you might want to store the user in localStorage here
      // localStorage.setItem('user', JSON.stringify(userData));
    };
  
    const handleLogout = () => {
      setUser(null);
      // Clear user from localStorage if you're using it
      // localStorage.removeItem('user');
    };
  
      // Main content of your app
  const MainContent = () => (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>This is the main content of the app.</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
  return (
    <div className="App">
      {user ? (
        <MainContent />
      ) : (
        <div>
          <h2>Please log in to continue</h2>
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default App;