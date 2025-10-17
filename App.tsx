import React, { useState, useEffect } from 'react';
// Fix: User type should be imported from './types' as it is not exported from AppContext.
import { AppProvider } from './context/AppContext';
import { User } from './types';
import Login from './components/auth/Login';
import MainApp from './components/MainApp';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('emergencyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    localStorage.setItem('emergencyUser', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('emergencyUser');
    setUser(null);
  };

  return (
    <AppProvider>
      <div className="w-full min-h-screen bg-gray-900 font-sans">
        <div className="container mx-auto max-w-sm h-screen flex flex-col p-2 text-white">
          {user ? (
            <MainApp user={user} onLogout={handleLogout} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
