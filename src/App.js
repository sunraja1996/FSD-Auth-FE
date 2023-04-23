import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { toast, ToastContainer } from 'react-toastify';
import React from 'react';
import ProdectedRoute from './components/ProdectedRoute';
import Register from './components/Register';
import Otp from './components/Otp';
import Profile from './components/Profile';
import UserProfile from './components/Userprofile';
import Resetpassword from './components/Resetpassword';
import ResetOTP from './components/resetOTP';
import Updatepassword from './components/Updatepassword';

export const CommonContext = React.createContext();

function App() {
  return (
    <>
    <CommonContext.Provider value={{toast}}>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element= {<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/resetpassword' element={<Resetpassword/>}/>
        <Route path='/resetotp' element={<ResetOTP/>}/>
        <Route path='/updatepassword' element={<Updatepassword/>}/>
        <Route path = '/Otp' element={<Otp/>}></Route>
        <Route path='/dashboard' element={ <ProdectedRoute> <Dashboard/> </ProdectedRoute> }  />
        <Route path='/profile' element={ <ProdectedRoute> <Profile/> </ProdectedRoute> }  />
        <Route path='/user' element={<UserProfile/>}/>
        <Route path='*' element= {<Navigate to= '/login'/>} />
        </Routes>
        </BrowserRouter>
        <ToastContainer/>
        </CommonContext.Provider>
    </>
  );
}

export default App;
