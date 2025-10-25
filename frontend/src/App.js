import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import Statistics from './components/Statistics';
import './App.css';

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem('token') && localStorage.getItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        
        <Route 
          path="/login" 
          element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        
        <Route 
          path="/dashboard" 
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" replace />} 
        />
        
        <Route 
          path="/statistics" 
          element={isLoggedIn() ? <Statistics /> : <Navigate to="/" replace />} 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
