import { useState } from 'react'
import{Box} from '@mui/material'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { setDiarys } from '../../redux/features/diarySlice'
import { useNavigate } from 'react-router-dom'
import diaryApi from '../../api/diaryApi'


export default function BoardTemplate() {
  const navigate = useNavigate()
  const dispatch =useDispatch()

  const createDiary = async()=>{
    try{
      const res = await diaryApi.create()
      dispatch(setDiarys([res]))
      navigate(`/diary/${res.id}`)
    }catch(error){
      alert('无法创建首个日记板块'+error)
    }
  }

  return (
    //日记初始化界面
       <Box sx={{
        height:'100%',
        display:'flex',
        alignItems: 'center',
        justifyContent:'center',
        
      }}> 
          <Button
            variant='outlined'
            onClick={createDiary}
            sx={{
              
              position:'absolute',
              top: '50%', // 垂直居中，距离顶部偏移 50%
              left: '50%', // 水平居中，距离左侧偏移 50%  
            }} 
            
          >
           👆 Click here to create your first diary
          </Button>
        </Box>
     
    
  )
}
