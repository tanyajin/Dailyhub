import {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Box,TextField,Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import userApi from '../../api/userApi'
import tokenValidate from '../../tools/tokenValidate'
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import * as THREE from 'three';
import { angleToRadians } from '../../tools/angle'
import { OrbitControls, Environment } from '@react-three/drei';
import RoomOverview from '../scenes/RoomOverview';
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()

  function handleNavigate() {
    navigate('/login')
  }

  //验证是否已经登录 
  const checkToken = async () =>{
    const isAuthenticated  = await tokenValidate.isAuthenticated()
    if(isAuthenticated){
      navigate('/home')
    }
  }

  useEffect(()=>{
    checkToken();
  },[navigate])
  const [errorMessage, setErrorMessage] = useState({
    usernameError:'',
    passwordError:'',
    confirmPasswordError:''
  });


  

  const handleSubmit=async(e)=>{
    e.preventDefault();
    //提交后清空message
    setErrorMessage({
      usernameError:'',
      passwordError:'',
      confirmPasswordError:''
    })

    const data =new FormData(e.target)
    const username = data.get('username').trim()
    const password = data.get('password').trim()
    const confirmpassword = data.get('confirmpassword').trim()

    let error =false;

    if(username ===''){
        error=true 
        setErrorMessage((preMessage)=>({
          ...preMessage,
          usernameError:'Oops! We can\'t proceed without your username.'
        }) )
    }

    if(password ===''){
      error=true 
      setErrorMessage((preMessage)=>({
        ...preMessage,
        passwordError:'Oops! We can\'t proceed without your password.'
      }) )
   }

  if(confirmpassword ===''){
    error=true 
    setErrorMessage((preMessage)=>({
      ...preMessage,
      confirmPasswordError:'Oops! We can\'t proceed without your confirmed password.'
    }) )
  }

  if(confirmpassword!==password){
    error=true 
    setErrorMessage((preMessage)=>({
      ...preMessage,
      confirmPasswordError:'Oops! Your confirmed password and new password do not match. Please enter your passwords again.'
    }) )
  }

  if(error) return

  setLoading(true);

  try{
    const res = await userApi.signup ({
      username,password,confirmpassword
    })

    setLoading(false)
    localStorage.setItem('token',res.token)
    navigate('/')
  }catch(error){
    const errors =error.data.errors
    errors.forEach(e=>{
      if(e.param ==='username'){
        setErrorMessage((preMessage)=>({
          ...preMessage,
          usernameError:e.msg
        }) )
      }

      if(e.param ==='password'){
        setErrorMessage((preMessage)=>({
          ...preMessage,
          passwordError:e.msg
        }) )
      }

      if(e.param ==='confirmpassword'){
        setErrorMessage((preMessage)=>({
          ...preMessage,
          confirmPasswordError:e.msg
        }) )
      }
       
      setLoading(false)
    })
  }

  }


  return (
    <>

<Canvas shadows >
        <ScrollControls pages={1} style={{
     marginLeft:'35%',
     marginTop:'15%',
 

  }}>
          <Scroll>
         
            <OrbitControls enableZoom={false} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(60)} />

            <ambientLight args={['#ffffff', 0.25]} />
            <spotLight args={['#ffffff', 1.5, 7, angleToRadians(45), 0.4]} position={[-1, 1, 0]} castShadow />
            <directionalLight args={['#ffffff', 0.5]} position={[-1, 3, 0]} />

            <RoomOverview />

            <Environment background>
              <mesh scale={100}>
                <sphereGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color='#b98b93' side={THREE.BackSide} />

              </mesh>
            </Environment>


          </Scroll>
         
          <Scroll html style={{
   
  }}>
      
          <Box
     component='form'
     sx={{
      width: '500px' 
   
  }}
     onSubmit={handleSubmit}
     noValidate
    >
    <TextField
      margin='normal'
      required
      fullWidth
      id='username'
      label='Username'
      name='username'
      disabled={loading}
      error={errorMessage.usernameError!==''}
      helperText={errorMessage.usernameError}
    />
   
    <TextField
      margin='normal'
      required
      fullWidth
      id='password'
      label='Password'
      name='password'
      type='password'
      disabled={loading}
      error={errorMessage.passwordError!==''}
      helperText={errorMessage.passwordError}
    />

    <TextField
      margin='normal'
      required
      fullWidth
      id='confirmpassword'
      label='Confirm Password'
      name='confirmpassword'
      type='password'
      disabled={loading}
      error={errorMessage.confirmPasswordError!==''}
      helperText={errorMessage.confirmPasswordError}
    />

    <LoadingButton 
      sx={{mt:3,mb:2}}
      variant='outlined'
      fullWidth
      color='success'
      type='submit'
      loading={loading}
    >
      Sign up
    </LoadingButton>
   
    <Button 
        onClick={handleNavigate}
        sx={{textTransform:'none'}}
        fullWidth
        >
          Already In? Enter Dailyhub Now.
      </Button>

    </Box>


           

          </Scroll>
        </ScrollControls>

      </Canvas>

   
  
  
  
  
  
  </>
  )
}

export default Signup