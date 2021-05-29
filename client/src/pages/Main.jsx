import React from 'react';
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {pararSesion} from '../utils/SesionAPI'

// Componentes
import ListaSalas from '../components/ListaSalas'
import CrearSala from '../components/CrearSala';
import GrabarSesion from '../components/GrabarSesion';
import Grid from '@material-ui/core/Grid'


function Main() {
    const user = useSelector((state)=>state.user)
    const history = useHistory()
    
    // Debido a un intervalo rebelde
    pararSesion()

    useEffect(()=> {
        if(!user.loggedIn) {
            history.push('/')
        }
    }, [user.loggedIn, history])

    

    return (
        <Grid container 
        spacing={1}
        >
          <Grid item xs={12}>
            <ListaSalas />
          </Grid>
          <Grid item xs={12}>
            <CrearSala />
          </Grid>
          <Grid item xs={12}>
            <GrabarSesion />
          </Grid>
        </Grid>
    )
}

export default Main