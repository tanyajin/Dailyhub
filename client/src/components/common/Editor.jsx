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
import 'react-quill/dist/quill.snow.css';


export default function Editor() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {diaryId } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [isfavorites, setIsFavorites] = useState(false);
  const [value, setValue] = useState('');

  const favoritesList = useSelector((state)=>state.allFavorites.value)


 
  useEffect(() => {
    console.log(diaryId)
    const getDiary = async () => {
      try {
        const res = await diaryApi.getOne(diaryId)
        setTitle(res.title)
        setDescription(res.description)
        setIsFavorites(res.favorites)
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
  
  return (
    <>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      width: '100%'
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

      <IconButton variant='outlined' color='error'  >
        <DelectOutlinedIcon />
      </IconButton>
    </Box>

    <Box sx={{ padding: '10px 50px'}}>

    <TextField
            value={title}
            placeholder='Untitled'
            variant='outlined'
            fullWidth
            // onChange={updateTitle}
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
            // onChange={updateDescription}
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '& .MuiOutlinedInput-root': { fontSize: '1rem' }
            }}
          />

          <ReactQuill theme="snow" value={value} onChange={setValue} />
       
        </Box>


 


  </>
  )
}
