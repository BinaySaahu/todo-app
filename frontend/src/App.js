import './App.css';
import HomePage from './components/HomePage';
import { Route,Routes } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import { useState } from 'react';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element = {<HomePage/>}/>
        <Route path='/dashboard' element = {<DashBoard/>}/>
      </Routes>
    </div>
  );
}

export default App;
