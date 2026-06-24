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
import Startup from './pages/Startup/Startup';
import { AuthProvider } from './context/AuthContext';



function App() {

  return (
    <AuthProvider>  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}/>
          <Route path="/foodLogging" element={<ProtectedRoute><FoodLogging/></ProtectedRoute>}/>
          <Route path="/nutrition" element={<ProtectedRoute><Nutrition/></ProtectedRoute>}/>
          <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
          <Route path="/overview" element={<ProtectedRoute><Overview/></ProtectedRoute>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/weightLogging" element={<WeightLogging/>}/>
          <Route path="/workout" element={<Workout/>}/>
          <Route path="/startup" element={<ProtectedRoute><Startup/></ProtectedRoute>}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
