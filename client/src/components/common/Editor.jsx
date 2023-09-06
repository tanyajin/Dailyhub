import React,{useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { Box, IconButton, TextField, Button, Typography,Divider} from '@mui/material'
import StartBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import DelectOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {setDiarys} from '../../redux/features/diarySlice'
import {setFavoritesList } from '../../redux/features/favoritesSlice'
import diaryApi from '../../api/diaryApi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

let timer
const timeout = 500
export default function Editor() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {diaryId } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [isfavorites, setIsFavorites] = useState(false);
  const [content, setContent] = useState('');

  const favoritesList = useSelector((state)=>state.allFavorites.value)
  const diarys = useSelector((state)=>state.diary.value)

 
  useEffect(() => {
    console.log(diaryId)
    const getDiary = async () => {
      try {
        const res = await diaryApi.getOne(diaryId)
        setTitle(res.title)
        setDescription(res.description)
        setIsFavorites(res.favorites)
        setContent(res.content)
        console.log(res)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
    getDiary()
  }, [diaryId]);
  


  const addfavorites=async()=>{
    try {
      const diary = await diaryApi.update(diaryId,{favorites:!isfavorites})
       let newFavoritesList = [...favoritesList]
       if(isfavorites){
        newFavoritesList=newFavoritesList.filter(e=>e.id !== diaryId)
       }else{
        newFavoritesList.unshift(diary)
       }
       dispatch(setFavoritesList(newFavoritesList))
       setIsFavorites(!isfavorites)
     
     } catch (error) {
       alert(error)
     }
  }

  const deleteDiary=async()=>{
    try{
      await diaryApi.delete(diaryId)
      if(isfavorites){
        const newFavoritesList = favoritesList.filter(e=>e.id!==diaryId)
        dispatch(setFavoritesList(newFavoritesList))
      }
      const newDiarysList=diarys.filter(e=>e.id!==diaryId)
      //没有其他日记了，导航到初始化日记界面
      if(newDiarysList.length===0){
        navigate('/diary')
      }else{
        navigate(`/diary/${newDiarysList[0].id}`)
      }
      dispatch(setDiarys(newDiarysList))
    }catch(error){
      alert(error)
    }
  }
  

  const changeTitle=async(e)=>{
       //每次输入内容前清除定时器
       clearTimeout(timer)
       const newTitle = e.target.value 
       setTitle(newTitle)
       
       let tempDiarys =[...diarys]
       const index =tempDiarys.findIndex(e=>e.id===diaryId)
       tempDiarys[index]={...tempDiarys[index],title:newTitle}
       dispatch(setDiarys(tempDiarys))

      if(isfavorites){
        let tempFavoritesList=[...favoritesList]
        const favoritesIndex=tempFavoritesList.findIndex(e=>e.id===diaryId)
        tempFavoritesList[favoritesIndex]={...tempDiarys[index],title:newTitle}
        dispatch(setFavoritesList(tempFavoritesList))
      }

      //重新设置定时器
      timer=setTimeout(async()=>{
        try{
          await diaryApi.update(diaryId,{title:newTitle})
        }catch(error){
          console.log(error)
          alert(error)
        }
      },timeout)

  }


const changeDescription=async(e)=>{
  clearTimeout(timer)
  const newDescription=e.target.value
  setDescription(newDescription)

  timer=setTimeout(async()=>{
    try{
      await diaryApi.update(diaryId,{description:newDescription})
    }catch(error){
      console.log(error)
      alert(error)
    }
  },timeout)

}

const changeContent =async(e)=>{
  //每次输入内容前清除定时器
  clearTimeout(timer)
  const newContent = e
  setContent(newContent)
  

 //重新设置定时器
 timer=setTimeout(async()=>{
   try{
     await diaryApi.update(diaryId,{content:newContent})
   }catch(error){
     console.log(error)
     alert(error)
   }
 },timeout)

}

  return (
    <>
    <Box sx={{
      alignItems: 'center',
      width: '100%',

    }}>
      <IconButton variant='outlined' onClick={addfavorites}>
        {
          isfavorites ? (
            <StartBorderOutlinedIcon color='warning' />
          ) : (
            <StartBorderOutlinedIcon />
          )
        }
      </IconButton>

      <IconButton variant='outlined' color='error' onClick={deleteDiary} sx={{
        marginLeft:'90%'
      
    }} >
        <DelectOutlinedIcon />
      </IconButton>

        
    <Box sx={{ padding: '10px 50px'}}>

<TextField
        value={title}
        placeholder='Untitled'
        variant='outlined'
        fullWidth
         onChange={changeTitle}
        sx={{
          '& .MuiOutlinedInput-input': { padding: 0 },
          '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
          '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' }
        }}
      />

      <TextField
        value={description}
        placeholder='Add a descrpition'
        variant='outlined'
        multiline
        fullWidth
         onChange={changeDescription}
        sx={{
          '& .MuiOutlinedInput-input': { padding: 0 },
          '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
          '& .MuiOutlinedInput-root': { fontSize: '1rem' }
        }}
      />

      <ReactQuill  placeholder='compose your epic' theme="bubble" value={content} onChange={changeContent} />
   
    </Box>



    </Box>


 


  </>
  )
}
