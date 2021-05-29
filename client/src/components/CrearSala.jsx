import React from 'react'
import {useState} from 'react'
import {TextField, Typography, Button, Paper} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {openPopup} from '../actions/popup'

function CrearSala() {
    const [textRoom, setTextRoom] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const handleTextRoom = (input) => {
        setTextRoom(input.target.value)
    }

    const createRoom = () => {
        if(textRoom !== ''){
            history.push(`sala/${textRoom}`)
        }else {
            dispatch(openPopup("Ponle nombre a la sala nueva."))
        }
        
    }

    return (
        <Paper style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '8px'}}>
            <Typography variant="h4" color="initial">Crear sala</Typography>
            <Typography variant="body1" color="initial">Crea tu propia sala.</Typography>
            <TextField
            fullWidth
              label="Nombre sala"
              variant="outlined"
              onChange={handleTextRoom}             
            />

            <Button fullWidth variant='contained' onClick={createRoom}>Crear sala nueva</Button>
        </Paper>
    )
}

export default CrearSala