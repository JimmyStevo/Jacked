import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import FoodLogging from './pages/FoodLogging/FoodLogging';
import Login from './pages/Login/Login';
import Nutrition from './pages/Nutrition/Nutrition';
import Overview from './pages/Overview/Overview';
import Settings from './pages/Settings/Settings';
import SignUp from './pages/Sign-Up/SignUp';
import WeightLogging from './pages/WeightLogging/WeightLogging';
import Workout from './pages/Workout/Workout';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  const insertSettings = (newSettings) => {
    console.log('Settings updated:', newSettings);
  }

  return (
    <AuthProvider>  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/foodLogging" element={<FoodLogging/>}/>
          <Route path="/nutrition" element={<Nutrition/>}/>
          <Route path="/overview" element={<Overview/>}/>
          <Route path="/settings" element={<Settings insertSettings={insertSettings}/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/weightLogging" element={<WeightLogging/>}/>
          <Route path="/workout" element={<Workout/>}/>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
