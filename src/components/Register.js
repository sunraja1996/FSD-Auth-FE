import React, { useState,useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import{env} from '../environment'
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import { CommonContext } from '../App';


function Register() {

  let commonContext = useContext(CommonContext)

    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let navigate = useNavigate()

    const login = async(e)=>{
        e.preventDefault(); // Prevent default form submission behavior
        console.log({email, password});
        let res = await axios.post(`${env.apiurl}/users/signup`, {email, password, firstName, lastName})
        if(res.data.statusCode === 200)
        {
          commonContext.toast.success('Verify your OTP', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
                });
            sessionStorage.setItem('email', email)
            navigate('/Otp')
        }
        else{
          commonContext.toast.error(res.data.message, {
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
    <div className='background-image-reg'>
    <div className="container-reg">
      <form className='form-reg'>
        <h3>Register Here</h3>

        <label className='label-reg' htmlFor="Firstname">Firstname</label>
        <input className='input-reg' type="text" placeholder="Firstname" id="firstname" onChange={(e) => setFirstName(e.target.value) } />

        <label className='label-reg' htmlFor="Lastname">Lastnamee</label>
        <input className='input-reg' type="text" placeholder="Lastname" id="lastname"  onChange={(e) => setLastName(e.target.value) }  />


        <label className='label-reg' htmlFor="username">Username</label>
        <input className='input-reg' type="text" placeholder="Email or Phone" id="username" onChange={(e) => setEmail(e.target.value) } />


        <label className='label-reg' htmlFor="password">Password</label>
        <input className='input-reg' type="password" placeholder="Password" id="password" autocomplete="on" onChange={(e) => setPassword(e.target.value) } />

        <button className='button-reg' onClick={(e) => login(e)} >Submit</button>

        <div>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>

      </form>
    </div>

    </div>
  )
}

export default Register
