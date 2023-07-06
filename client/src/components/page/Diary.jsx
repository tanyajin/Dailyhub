import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect ,useState} from 'react'
import {useNavigate, useParams,Link, Outlet} from 'react-router-dom'

import {Drawer,List,ListItem,Typography,IconButton,Box,ListItemButton} from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import images from '../../../public/images/index'
import tokenValidate from '../../tools/tokenValidate'
import diaryApi from '../../api/diaryApi'
import { setUser } from '../../redux/features/userSlice'
import {setDiarys} from '../../redux/features/diarySlice'
import Board from '../common/Board'

export default function Diary() {
  const {diaryId} = useParams()
  const user =useSelector((state)=>state.user.value)
  const diarys =useSelector((state)=>state.diary.value)
  const navigate = useNavigate();
  const dispatch =useDispatch();
 
  //验证是否已经登录 
  const checkToken = async () => {
    const user = await tokenValidate.isAuthenticated()
    if (!user) {
      navigate('/')
    }else{

      dispatch(setUser(user))
    } 
  }

  useEffect(() => {
    checkToken();
  }, [navigate])

  useEffect(() => {
    const getDiarys=async()=>{
      try{
        const diarys =await diaryApi.getAll();
        dispatch(setDiarys(diarys))
        if (diarys.length > 0 && diaryId === undefined) {
          navigate(`/diary/${diarys[0].id}`)
        }
      }catch(error){
          alert('Diary组件初始化无法加载所有日记'+error)
      } 
    }
    getDiarys();
  }, [])

  useEffect(() => {
    console.log(diarys)
  }, [diarys])

const Return=()=>{
    navigate('/home')
}

const AddDiary=async()=>{
  try{
    const res = await diaryApi.create()
    const newList =[res,...diarys]
    dispatch(setDiarys(newList))
    navigate(`/diary/${res.id}`)
  }catch(error){
    alert(error)
  }
}
const sidebarWidth = 250
  return (
    <Box sx={{
      display:'flex'
    }}>
    <Drawer
    container={window.document.body}
    variant='permanent'
    open={true}
    sx={{
      width:sidebarWidth,
      height:'100vh',
      '& > div':{borderRight:'none'}
    }}
  >
      <List
        disablePadding
        sx={{
          height:'100vh',
           width:sidebarWidth,
           backgroundColor:images.colors.secondary
        }}
        
      >
          <ListItem>
              <Box sx={{
                  width:'100%',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-between'
              }}> 
              
               <Typography variant='body2' fontWeight='1000'>
                  😊 Hi, {user.username}   
                  </Typography>
                  <IconButton onClick={Return}>
                    <LogoutOutlinedIcon fontSize='small'/>
                  </IconButton>
              </Box>
          </ListItem>
          <ListItem>
                  <Box sx={{
                    paddingTop:'10px',
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}> 

                    <Typography variant='body2' fontWeight='1000'>
                    💌Favorites
                    </Typography>
                    </Box>
             </ListItem>


          <ListItem>
                  <Box sx={{
                    paddingTop:'10px',
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}> 

                    <Typography variant='body2' fontWeight='700'>
                    📃Diary
                    </Typography>
                    <IconButton onClick={AddDiary}>
                    <AddBoxOutlinedIcon fontSize='small'/>
                  </IconButton>
                    </Box>
             </ListItem>

                 {
                            diarys.map((item, index) => (
                            
                                <ListItem key={index}>
                                    <ListItemButton>
                                            <Typography 
                                              variant='body2'
                                              fontWeight="700"
                                              sx={{ whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}
                                              >
                                               {item.title}
                                            </Typography>

                                        </ListItemButton>
                                </ListItem>
                               
                            ))
                        }




          </List>
      </Drawer>

      <Box sex={{
        flexGrow:1,
        p:1,
        width:'max-content'
      }}>

      <Outlet/>


      </Box>
    

    </Box>
  )
}
