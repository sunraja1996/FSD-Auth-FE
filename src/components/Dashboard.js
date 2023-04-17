import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import{env} from '../environment'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { CommonContext } from '../App';

function Dashboard() {

  
  let [data, setData] = useState([])
  let navigate = useNavigate()

  let loadData = async() =>{
    let token = sessionStorage.getItem('token')

    if(token){
        let res = await axios.get(`${env.apiurl}/users/all-users`,{
          headers:{
            Authorization : `Bearer ${token}`
          }
        })

        if(res.data.statusCode===200){
          commonContext.toast.success(res.data.message)
          setData(res.data.users)
        }
        else{
          commonContext.toast.error(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
          setTimeout(() =>{
            logout()
          },3000)
        }

    }else{
      commonContext.toast.error("No Token Found", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
      setTimeout(() =>{
        logout()
      },3000)
    }
  }


  let logout = () => {
    sessionStorage.clear()
    navigate('./login')
  }

  useEffect(() =>{
      loadData()
  }, [])

  return (
    <div>
      <h1 style={{"textAlign" : "center"}}> Dashboard </h1>

      <div className='add-user'>
        <Button variant="success"><PersonAddIcon/>Add User</Button> &nbsp;
        <Button variant="danger" onClick={()=>logout()} ><LogoutIcon/></Button>
      </div>
      
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e,i) => {
            return <tr key={i}>
              <td>{i+1}</td>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
              <td>
    <Button variant='warning'>
      <EditIcon/> Edit
    </Button>
</td>

            </tr>
          })
        }
      </tbody>
    </Table>
    
    <Button variant="primary" size="lg" onClick={() => loadData()}>
        Refresh
      </Button>
      
    </div>
  )
}

export default Dashboard