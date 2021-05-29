import React from 'react';
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Typography, Paper, Grid, Button} from '@material-ui/core'
import {pararSesion, getValores} from '../utils/SesionAPI'
import {createSession} from '../api/index'
import { fade } from '@material-ui/core/styles/colorManipulator';
import FavoriteIcon from '@material-ui/icons/Favorite'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import {setUserState} from '../actions/user'
import Timer from '../components/Timer'
import ZonaUsuario from '../components/ZonaUsuario'
import swal from 'sweetalert'


function SalaSolitario() {
    const history = useHistory()
    const user = useSelector((state)=>state.user)
    const valoresActuales = useSelector((state=>state.sensors))
    const dispatch = useDispatch()
    
    useEffect(()=> {
        if(!user.loggedIn) {
            history.push('/')
        }
    }, [user.loggedIn, history])

    const save = ()=> {
        const valores = getValores()
        const datos = {
            "username": user.username,
            "pulsaciones": valores.pulsacion,
            "cadencias": valores.cadencia,
            "puntuacion": 0
        }
        createSession(datos).then((data)=>{
            console.log(data)
            dispatch(setUserState())
            pararSesion()
            history.push('/main')
            swal({
                title: "Sesión Guardada",
                icon: "success"
            })
        })       
    }


    return (
        <div>
            <Typography variant="h2" color="initial">
                Grabar Sesión
            </Typography>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
            >

                <Grid item xs={12}>
                    <Paper style={{backgroundColor: fade('#FFFFFF', 0.1)}}>
                        <Typography variant="h2" color="initial"> <FavoriteIcon style={{fontSize: '40px'}}/> {valoresActuales.heart} ppm</Typography>
                    </Paper>
                    
                </Grid>

                <Grid item xs={12}>
                <Paper style={{backgroundColor: fade('#FFFFFF', 0.1)}}>
                    <Typography variant="h2" color="initial"> <RotateLeftIcon style={{fontSize: '40px'}}/> {valoresActuales.cadence} rpm</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Timer />            
                </Grid>
                <Grid item xs={6}>
                    <ZonaUsuario />  
                </Grid>
                
            </Grid>
            
            <Button variant='contained' onClick={save} fullWidth>Guardar Sesión</Button>
        </div>
    );
}

export default SalaSolitario;