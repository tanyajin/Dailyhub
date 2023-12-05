import '../../../public/css/card.scss'
import  { IconButton, Input, TextField } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const Card = props => {
    return (
      <>
      <div style={{ display: 'flex', alignItems: 'center' }} className="card" id="outlined-basic" label="Outlined" variant="outlined" >
      {props.children}
      <div style={{ marginLeft: 'auto' }}>
          <IconButton>
            <RemoveCircleOutlineIcon fontSize='large' />
          </IconButton>
        </div>
      </div>
  
        
        
      </>
       
    )
}

export default Card

