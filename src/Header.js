import React from 'react';
import './App.css';
import task from './images/download.png';


function Header() {
  return (
      <div>
        <div style={{marginTop:'10px',marginLeft:'70%'}}>
          <div style={{display:'inline-block'}}>
            <img src={task} alt='taskIcon' style={{height:'40px',width:'40px'}}></img>
          </div> 
          <div style={{display:'inline-block'}}> 
            <p> Task Manager </p>
          </div>
        </div> 
      <hr/>
    </div>
  );
}

export default Header;
