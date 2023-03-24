import React, { useState } from 'react'
import './Tasks.css'
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { useCookies } from 'react-cookie';
import axios from 'axios';
function Tasks(props) {
  const[cookies,setCookie,removeCookie] = useCookies(['user']);
  const[doneStatus,setDoneSatus] = useState(false);
  const userId = cookies.UserId;
  const item = props.item;
  const handleClick = async ()=>{
    console.log(item)
    
    const indexOfItems = props.items.indexOf(item)
    props.items.splice(indexOfItems,1); 
    setDoneSatus(false);
    const response = await axios.put("http://localhost:8000/view", {userId,item});
  }
  return (
    <div className='task'>
      <div className="task_content">
        <h3 style={doneStatus?{textDecoration:"line-through",color:'rgb(97 97 97 / 57%)'}:{textDecoration:"none"}}>{props.item}</h3>
        <div className="task_content_icon">
            <DoneIcon className='doneIcon' onClick = {()=>setDoneSatus(true)}/>
            <ClearIcon className='deleteIcon'  onClick = {handleClick}/>
        </div>
      </div>
    </div>
  )
}

export default Tasks
