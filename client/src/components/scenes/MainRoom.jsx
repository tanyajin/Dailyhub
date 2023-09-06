import React,{ useEffect,useState } from 'react'
import Spline from '@splinetool/react-spline';
import { useNavigate} from 'react-router-dom'



export default function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio('../../../public/music/whitenoise.mp3');
  audio.loop = true;

  useEffect(() => {
    return () => {
      // 组件卸载时停止播放
      audio.pause();
    }
  }, []);

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
   
    if (e.target.name === 'Radio') {
      setIsPlaying(currentIsPlaying => {
        if (currentIsPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        return !currentIsPlaying;
      });
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
