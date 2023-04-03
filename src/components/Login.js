import React, { useState,useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import{env} from '../environment'
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import { CommonContext } from '../App';

function Login() {

  let commonContext = useContext(CommonContext)

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let navigate = useNavigate()

    
    const login = async(e)=>{
      e.preventDefault();
        console.log({email, password});
        let res = await axios.post(`${env.apiurl}/users/login`, {email, password})
        if(res.data.statusCode === 200)
        {
          commonContext.toast.success('Login Sucessfull', {
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

      if (res.data.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }

            
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



    const onSuccess = async (response) => {
      const token = response.tokenId;
      try {
        const res = await axios.post(`${env.apiurl}/auth/google`, { token });
        if (res.data.statusCode === 200) {
          console.log(res.data.message);
        } else {
          console.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const onFailure = (error) => {
      console.log(error);
    };
  



  return (
    <div className='background-image'>
    <div className="container">
      <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={(e) => setEmail(e.target.value) } />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" autocomplete="on" onChange={(e) => setPassword(e.target.value) } />

        <button onClick={(e) => login(e)} >Log In</button>

        <div>
      <p>Don't have an account? <Link to="/register">Create Account here</Link></p>
    </div>

        <div className="social">
          <div className="go"
          onClick={() => console.log("Button clicked")}
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}>Google</div>
          <div className="fb">Facebook</div>
        </div>
      </form>
    </div>

    </div>


  )
}

export default Login
