import React, { useState } from 'react'
import './HomePage.css'
import Login from './Login';
import Register from './Register';
function HomePage(props) {
    const[viewLogin,setViewLogin] = useState(false);
    const[viewRegister,setViewRegister] = useState(false);
    const handleLogin = ()=>{
        setViewLogin(true);
    }
    const handleRegister = ()=>{
        setViewRegister(true);
    }
  return (
    <div className='homepage'>

        <div className="homepage_header">
            <h1>ToDo.Com</h1>
        </div>
        <div className="homepage_login">
            <button className='homepage_login_btn' onClick={handleLogin}>Login</button>
            {viewLogin && <Login setViewLogin = {setViewLogin} setViewRegister = {setViewRegister}/>}
        </div>
        <div className="homepage_register">
            <button className='homepage_register_btn' onClick={handleRegister}>Register</button>
            {viewRegister && <Register setViewRegister = {setViewRegister} setViewLogin = {setViewLogin}/>}
        </div>
      
    </div>
  )
}

export default HomePage
