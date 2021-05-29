import React from 'react'
import {Dialog, Typography, Box} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {closePopup} from '../actions/popup'
import Charge from '../components/Charge'


function Popup() {
    const popup = useSelector((state)=>state.popup)
    const dispatch = useDispatch()

  let charge
  if(popup.charge) {
    charge = <Charge />
  }

    const close = () => {
        dispatch(closePopup())
    }

    return (
        
        <Dialog
        
        open={popup.visible}
        onClose={close}
        aria-labelledby="simple-dialog-title"
      >
          <Box m={2}>
            <Typography  variant="h5" color="initial">{popup.texto}{charge}</Typography>       
          </Box>
      </Dialog>
    )
}

export default Popup