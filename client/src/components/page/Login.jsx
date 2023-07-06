import {Link,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {Box,TextField,Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import userApi from '../../api/userApi'
import tokenValidate from '../../tools/tokenValidate'

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate =useNavigate()

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
  });

  const handleSubmit=async(e)=>{
    e.preventDefault();
    //提交前清空message
    setErrorMessage({
      usernameError:'',
      passwordError:'',

    })
   // 使用 FormData 构造函数从表单中获取数据。e.target 表示当前触发事件的表单元素。
    const data =new FormData(e.target)
    const username = data.get('username').trim()
    const password = data.get('password').trim()

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


  if(error) return

  setLoading(true);

  try{
    const res = await userApi.login ({
      username,password
    })
//如果登录成功，将返回的 token 存储到 localStorage 中，然后导航到首页。
    setLoading(false)
    localStorage.setItem('token',res.token)
    navigate('/home')
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

    
       
      setLoading(false)
    })
  }

  }

  return (
    <>
    <Box
     component='form'
     sx={{mt:1}}
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


    <LoadingButton 
      sx={{mt:3,mb:2}}
      variant='outlined'
      fullWidth
      color='success'
      type='submit'
      loading={loading}
    >
      Login
    </LoadingButton>
   
    <Button 
        component={Link}
        to='/signup'
        sx={{textTransform:'none'}}
        fullWidth
        >
          New To MyRoom? Create Your Own Now.
      </Button>

    </Box>
  
  
  
  
  
  </>
  )

}

export default Login