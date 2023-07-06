import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { useNavigate} from 'react-router-dom'

export default function App() {

  const navigate = useNavigate();
  
  function onMouseDown(e) {
    if (e.target.name === 'Scheduleboard') {
      setTimeout(() => {

        navigate('/schedule');
      }, 1000); 
    }
    if (e.target.name === 'Tablet') {
      setTimeout(() => {
        navigate(`/diary`)
      }, 1000); 
   
    }
   

  }


  return (
    <>
     
      <Spline scene="../../../public/models/scene.splinecode" 
    onMouseDown={onMouseDown} 
    /> 
   
    </>
   
  
    
  
   
  );
}
