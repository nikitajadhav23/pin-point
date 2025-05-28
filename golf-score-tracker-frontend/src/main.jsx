// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CoachDashboard from './pages/CoachDashboard.jsx';
import TeamPage from './pages/TeamPage.jsx';         
import TestPage from './pages/TestPage.jsx';         
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateTeamPage from './pages/CreateTeamPage.jsx';  
import TeamDetailPage from './pages/TeamDetailPage.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach"
            element={
              <ProtectedRoute>
                <CoachDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach/teams"
            element={
              <ProtectedRoute>
                <TeamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach/tests"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach/teams/create"
            element={
              <ProtectedRoute>
                <CreateTeamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach/teams/:id"
            element={
              <ProtectedRoute>
                <TeamDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
