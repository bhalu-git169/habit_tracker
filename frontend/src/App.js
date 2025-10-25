import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import Statistics from './components/Statistics';
import './App.css';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return token && user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/statistics" 
          element={
            <PrivateRoute>
              <Statistics />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
