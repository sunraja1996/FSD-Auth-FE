import React, { useState,useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import{env} from '../environment'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import { CommonContext } from '../App';


function Otp() {

  let commonContext = useContext(CommonContext)

  let navigate = useNavigate()

    let email = sessionStorage.getItem('email')===null?navigate('/login'):sessionStorage.getItem('email')
    let [otp, setOtp] = useState("")
    
    const login = async(e)=>{
        e.preventDefault(); // Prevent default form submission behavior
        let res = await axios.post(`${env.apiurl}/users/verify-email`, {email, otp})
        if(res.data.statusCode === 200)
        {
          commonContext.toast.success('Register Successfully', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
                });

          setTimeout(() => {
            navigate('/login')
          })
           
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
    <div className='div'>
    <div className="login-wrapper">
	 <Form>
        <h1>
            Verify OTP
        </h1>

      <Form.Group className="mb-3">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control type="otp" placeholder="OTP" autocomplete="on" onChange={(e) => setOtp(e.target.value) } />
      </Form.Group>

      <Button variant="primary" onClick={(e) => login(e)}>
        Submit
      </Button>

      <div>
      <p>Don't have an account? <Link to="/register">Create Account here</Link></p>
    </div>
    
    </Form>
	</div>
  </div>
  )
}

export default Otp
