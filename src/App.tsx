// import React from 'react';
// import logo from './logo.svg';
import { useEffect } from 'react';
import AuthPage from './pages/authPage/AuthPage';
import { DashboardPage } from './pages/dashboardPage.tsx/DashboardPage';
import { useAuthStore } from './stores/useAuthStore/useAuthStore';

function App() {
  const {checkAuth, isAuthenticated} = useAuthStore();
  useEffect(() => {
    checkAuth();  
  }, [checkAuth]);

  return (
    <div className="App">
      {isAuthenticated ? <DashboardPage/> : <AuthPage />}
      
    </div>
  );
}

export default App;
