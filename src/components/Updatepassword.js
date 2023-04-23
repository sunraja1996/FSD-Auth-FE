import React, { useState,useContext } from 'react';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import{env} from '../environment'
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import { CommonContext } from '../App';

function Updatepassword() {

    let commonContext = useContext(CommonContext)

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        commonContext.toast.error('Invalid Mail ID', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.post(`${env.apiurl}/update-password`, { password: newPassword, confirmPassword }, { headers: { Authorization: `Bearer ${token}` } });
      if(res.data.statusCode === 200)
        {
          commonContext.toast.success('Password Updated Successfully', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
                })
                sessionStorage.setItem('token', res.data.token);

     
                navigate('/login');
      }
    } catch (error) {
      console.log(error);
      commonContext.toast.error('Internal Server Error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="new-password">Enter New Password</label>
        <input type="password" className="form-control" id="new-password" placeholder="Enter New Password" onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" className="form-control" id="confirm-password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default Updatepassword;
