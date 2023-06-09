import React, { useState,useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import{env} from '../environment'
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import { CommonContext } from '../App';

function Resetpassword() {

  let commonContext = useContext(CommonContext)

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let navigate = useNavigate()

    
    const resetpassword = async(e)=>{
      e.preventDefault();
        console.log({email, password});
        let res = await axios.post(`${env.apiurl}/users/reset-password`, {email})
        if(res.data.statusCode === 200)
        {
          commonContext.toast.success('OTP Sent', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
                });

                
      sessionStorage.setItem('token', res.data.token);

     
        navigate('/resetotp');
  

            
        }
        else{
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
        }
    }




  return (
    <div className='background-image'>
    <div className="container">
      <form>
        <h3>Reset Password</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={(e) => setEmail(e.target.value) } />


        <button onClick={(e) => resetpassword(e)} >Send OTP</button>

        <div>
      <p>Don't have an account? <Link to="/register">Create Account here</Link></p>
    </div>
      </form>
    </div>

    </div>


  )
}

export default Resetpassword
