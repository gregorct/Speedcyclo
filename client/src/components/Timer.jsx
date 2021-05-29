import React from 'react'
import {useSelector} from 'react-redux'
import Typography from '@material-ui/core/Typography'

function Timer() {
    const timer = useSelector((state)=>state.timer)
    const parseSeconds = (value) => {
        
        // comprobar si es menos de una hora
        let restante
        let horas
        let minutos
        let segundos


        if(value < 3600) {
            minutos = Math.trunc(value/60)
            segundos = value % 60
            return `${minutos}:${segundos}`
        } else {
            segundos = value % 60
            restante = Math.trunc(value/60)

            minutos = restante % 60
            horas = Math.trunc(restante/60)
            return `${horas}:${minutos}:${segundos}`
        }
    }

    

    return (
        <Typography variant="h2" color="initial" align='center'>{parseSeconds(timer.time)}</Typography>
    )
}

export default Timer