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
import { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Startup from './pages/Startup/Startup';

function App() {

    const [settings, setSettings] = useState([])
    const [startUp, setStartUp] = useState([])

    const insertSettings = (newSettings) => {
      setSettings(newSettings)
    }
    const insertStartup = (newStartUp) => {
      setStartUp(newStartUp)
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
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/weightLogging" element={<WeightLogging/>}/>
          <Route path="/workout" element={<Workout/>}/>
          <Route path="/startup" element={<Startup insertStartup={insertStartup}/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
