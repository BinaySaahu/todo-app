import './App.css';
import HomePage from './components/HomePage';
import { Route,Routes } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import { useState } from 'react';

function App() {
  const [isLoggedin,setIsLoggedin] = useState(false);
  return (
    <div className="app">
      <Routes>
        <Route path='/' element = {<HomePage setIsLoggedin = {setIsLoggedin}/>}/>
        <Route path='/dashboard' element = {isLoggedin?<DashBoard setIsLoggedin = {setIsLoggedin}/>:<HomePage setIsLoggedin = {setIsLoggedin}/>}/>
      </Routes>
    </div>
  );
}

export default App;
