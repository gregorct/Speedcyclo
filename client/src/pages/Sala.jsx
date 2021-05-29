import React from 'react';
import {Paper, Button, Typography, Grid} from '@material-ui/core'
import {pararSesion, getValores, deleteSocket, getPoints} from '../utils/SesionAPI'
import {useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {createSession} from '../api/index'
import UsuariosSala from '../components/UsuariosSala'
import {useDispatch} from 'react-redux'
import Valores from '../components/Valores'
import {setUserState} from '../actions/user'
import Timer from '../components/Timer'
import ZonaUsuario from '../components/ZonaUsuario'
import swal from 'sweetalert'



import { useEffect } from "react"

function Sala() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state)=>state.user)
    const {idSala} = useParams()
    
    useEffect(()=> {
        if(!user.loggedIn) {
            history.push('/')
        }
    }, [user.loggedIn, history])

    const mandarSesion = ()=>{
        const valores = getValores()
        const puntuacion = getPoints()
        const datos = {
            "username": user.username,
            "pulsaciones": valores.pulsacion,
            "cadencias": valores.cadencia,
            "puntuacion": puntuacion
        }
        createSession(datos)
        .then(()=>{
            dispatch(setUserState())
            pararSesion()
            swal({
                title: "Sesión Guardada",
                icon: "success"
            })
            history.push('/main')
        })

    }

    const save = ()=> {
        deleteSocket()
        mandarSesion()      
        //guardarSesion()
        
        
    }
    
    return (
        <Paper style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '8px'}}>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              
            >
              <Grid item xs={12}>
                <Typography variant="h4" color="initial">Sala {idSala}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Valores />
              </Grid>

              <Grid item xs={6}>
                <Timer />
              </Grid>

              <Grid item xs={6}>
                <ZonaUsuario />
              </Grid>

              <Grid item xs={12}>
                <UsuariosSala idSala={idSala} />
              </Grid>

              <Grid item xs={12}>
                <Button variant='contained' onClick={save} fullWidth>Guardar Sesión</Button>
              </Grid>

            </Grid>
            
            
            
            
        </Paper>
    )
}

export default Sala;