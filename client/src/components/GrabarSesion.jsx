import React from 'react'
import {useHistory} from 'react-router-dom'
import {grabarSesion} from '../utils/SesionAPI'
import {Button, Typography, Paper} from '@material-ui/core'

function GrabarSesion() {
    const history = useHistory()

    const actionGrabarSesion = ()=>{
        grabarSesion()
        history.push('/sesionsolitario')
    }

    return (
        <Paper style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '8px'}}>
            <Typography variant="h4" color="initial">Graba tu sesión</Typography>
            <Typography variant="body1" color="initial">Comienza a grabar tu propia sesión.</Typography>
            <Button fullWidth variant="contained" onClick={actionGrabarSesion}>Grabar Sesión</Button>
        </Paper>
    )
}

export default GrabarSesion