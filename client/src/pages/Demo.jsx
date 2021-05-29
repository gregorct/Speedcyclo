import React from 'react'
import {useState} from 'react'
import {Paper, Typography, Grid, TextField, Button} from '@material-ui/core'
import {startDummy, deleteSocket, setSocket} from '../utils/DemoAPI'
function Demo() {
    const [username, setUsername] = useState("")
    const [roomId, setRoomId] = useState("")
    

    const handleChangeRoomId = (event) => {
        setRoomId(event.target.value)
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const conectarSala = () => {
        setSocket(roomId, username)
    }


    return (
        <Paper style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '8px'}}>
            <Typography variant="h4" color="initial">Demo Page</Typography>
            <Grid container spacing={4} wrap='wrap'>
                <Grid item xs={12}>
                    <TextField label="Nombre de Sala" onChange={handleChangeRoomId} variant='outlined'/>
                    <TextField label="Usuario" onChange={handleChangeUsername} variant='outlined'/>
                    <Button variant="contained" color="default" size='large' onClick={conectarSala}>
                        Conectar a Sala
                    </Button>
                </Grid>

              <Grid item xs={12}>
                  
                  <Button variant="contained" color="default" onClick={startDummy}>
                    Start Dummy
                  </Button>
                  <Button variant="contained" color="default" onClick={deleteSocket}>
                    Stop Dummy
                  </Button>
              </Grid>
              
             
            </Grid>
        </Paper>
    )
}

export default Demo