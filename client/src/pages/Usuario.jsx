import React from 'react'
import {Button, Paper, Typography} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteUser} from '../actions/user'
import swal from 'sweetalert'

function Usuario() {
    const user = useSelector((state)=>state.user)
    const history = useHistory()
    const dispatch = useDispatch()

    const parseSeconds = (value) => {
        
        // comprobar si es menos de una hora
        let restante
        let horas
        let minutos
        let segundos


        if(value < 3600) {
            minutos = Math.trunc(value/60)
            segundos = value % 60
            return `${minutos} min ${segundos} seg`
        } else {
            segundos = value % 60
            restante = Math.trunc(value/60)

            minutos = restante % 60
            horas = Math.trunc(restante/60)
            return `${horas} h ${minutos} min ${segundos} seg`
        }
    }

    const eliminarUsuario = ()=>{
        swal({
            title: "Borrar usuario",
            dangerMode: true,
            text: "¿Estás seguro?",
            icon: "warning",
            buttons: ['Cancelar', 'Sí']

        }).then((value)=>{
            if(value){
                dispatch(deleteUser(user.username))
                swal({
                    title: "Usuario borrado correctamente",
                    icon: "success"    
                })
            }            
        })
        
    }

    useEffect(()=> {
        if(!user.loggedIn) {
            history.push('/')
        }
    }, [user.loggedIn, history])

    
    return (
        <Paper style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '8px'}}>
            <Typography variant="h4" color="initial">Hola {user.username}.</Typography>
            <Typography variant="h6" color="initial">Has realizado {user.numSessions} sesiones.</Typography>
            <Typography variant="h6" color="initial">Llevas {parseSeconds(user.totalTime)} encima de la bicicleta.</Typography>
            <Typography variant="h6" color="initial">Has conseguido {user.points} puntos.</Typography>
            <Button fullWidth variant='contained' onClick={eliminarUsuario}>Eliminar usuario</Button>
            
        </Paper>
    )
}

export default Usuario