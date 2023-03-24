import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './Register.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

function Register(props) {
  const[email,setEmail] = useState(null);
  const[password,setPassword] = useState(null);
  const[confirmPassword,setConfirmPassword] = useState(null);
  const[name,setName] = useState(null);
  const[cookies,setCookie,removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
    const handleClose = ()=>{
        props.setViewRegister(false);

    }
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
          const response = await axios.post(`http://localhost:8000/signup`,{name,email,password});
          setCookie('AuthToken',response.data.token);
          setCookie('UserId',response.data.userId);
          const success = response.status === 201;
          if(response.status === 201) {
            navigate ('/dashboard')
          }
          else if (response.status === 409){
            props.setViewRegister(false);
            props.setViewLogin(true);
          }
        }
       catch(error){
          console.log(error);
       }
      


    }
    console.log(email,password,confirmPassword);
  return (
    <div className='register'>
        <div className="register_form">
        <div className="register_head">
            Register
            <CloseIcon className="close_icon" onClick = {handleClose}/>
        </div>
        
        <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder='Email' onChange = {(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        <input type="password" placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <button className="register_btn" onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  )
}


export default Register
