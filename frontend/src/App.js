import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import Statistics from './components/Statistics';
import './App.css';

function App() {
  // Check if user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem('token') && localStorage.getItem('user');
  };

  return (
    <Router basename="/habit_tracker">
      <Routes>
        {/* Default route - show login if not logged in, dashboard if logged in */}
        <Route 
          path="/" 
          element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        
        {/* Login route */}
        <Route 
          path="/login" 
          element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        
        {/* Protected dashboard route */}
        <Route 
          path="/dashboard" 
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" replace />} 
        />
        
        {/* Protected statistics route */}
        <Route 
          path="/statistics" 
          element={isLoggedIn() ? <Statistics /> : <Navigate to="/" replace />} 
        />
        
        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
