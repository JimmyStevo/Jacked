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
import { useState } from 'react';



function App() {

  const [settings, setSettings] = useState([])
  const [startUp, setStartUp] = useState([])
  const [overview, setOverview] = useState([])
  const [home, setHome] = useState([])
  const [account, setAccount] = useState([])
  const [foodLogging, setFoodLogging] = useState([])
  const [nutrition, setNutrition] = useState([])
  const [weightLogging, setWeightLogging] = useState([])
  const [workout, setWorkout] = useState([])

    const insertSettings = (newSettings) => {
      setSettings(newSettings)
    }
    const insertStartup = (newStartUp) => {
      setStartUp(newStartUp)
    }
    const insertOverview = (newOverview) => {
      setOverview(newOverview)
    }
    const insertHome =(newHome)=>{
      setHome(newHome)
    }
    const insertAccount=(newAccount)=>{
      setAccount(newAccount)
    }
    const insertFoodLogging=(newFoodLogging)=>{
      setFoodLogging(newFoodLogging)
    }
    const insertNutrition=(newNutrition)=>{
      setNutrition(newNutrition)
    }
    const insertWeightLogging=(newWeightLogging)=>{
      setWeightLogging(newWeightLogging)
    }
    const insertWorkout=(newWorkout)=>{
      setWorkout(newWorkout)
    }

  return (
    <AuthProvider>  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home insertHome={insertHome}/>}/>
          <Route path="/account" element={<Account insertAccount={insertAccount}/>}/>
          <Route path="/foodLogging" element={<FoodLogging insertFoodLogging={insertFoodLogging}/>}/>
          <Route path="/nutrition" element={<Nutrition insertNutrition={insertNutrition}/>}/>
          <Route path="/settings" element={<Settings insertSettings={insertSettings}/>}/>
          <Route path="/overview" element={<Overview insertOverview={insertOverview}/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/weightLogging" element={<WeightLogging insertWeightLogging={insertWeightLogging}/>}/>
          <Route path="/workout" element={<Workout insertWorkout={insertWorkout}/>}/>
          <Route path="/startup" element={<Startup insertStartup={insertStartup}/>}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
