import React from 'react'
import {Typography, Paper} from '@material-ui/core'

function Usuario(props) {
    return (
        <Paper style={{padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.6)', height: '96px'}}>
            <Typography variant="h5" color="initial">{props.index+1}º {props.U}</Typography>
            <Typography variant="h6" color="initial">{props.H} ppm {props.C} rpm</Typography>
            <Typography variant="h6" color="initial">Puntuación: {props.P} pts</Typography>
        </Paper>
    )
}

export default Usuario