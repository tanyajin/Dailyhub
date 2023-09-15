import React, { useEffect, useRef } from 'react';
import { useNavigate} from 'react-router-dom'
import tokenValidate from '../../tools/tokenValidate'
import MainHome from './MainHome'

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';

export default function HomeScene() {


  const navigate = useNavigate();

  //验证是否已经登录 
  const checkToken = async () => {
    const user = await tokenValidate.isAuthenticated()
    if (!user) {
      navigate('/')
    }
  }

  useEffect(() => {
    checkToken();
  }, [navigate])



  return (
    <>
         {/* <MainRoom /> */}
         <MainHome></MainHome>
    </>
  );
};
