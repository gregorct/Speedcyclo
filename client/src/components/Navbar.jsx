// React
import React from 'react';
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {getHeartDevice, getCadenceDevice} from '../utils/BluetoothAPI'

// Estilos
import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Toolbar, Button, IconButton} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'

// Componentes
import Perfil from './Perfil'
import logo from '../assets/img/speedcyclo_logo.png'


// Declaración de estilos
const useStyles = makeStyles(() => ({
    flex: {
      flexGrow: 1,
    }
  }))

function Navbar() {
  const history = useHistory()
  const classes = useStyles()
  const user = useSelector((state)=>state.user)

  let button
  if(user.loggedIn) {
    button = <Perfil />
  }

  const volverInicio = () => {
    history.push('/main')
  }
    
    return (
        <AppBar position="static">
              <Toolbar>
                <Button variant="text" color="default" onClick={volverInicio}>
                <img src={logo} alt="" height="25px"/>
                </Button>
                
                <div className={classes.flex}></div>
                { button }
                <IconButton aria-label="botón pulsación" onClick={getHeartDevice}>
                  <FavoriteIcon fontSize="large" style={{ color: 'lightcoral' }}/>
                </IconButton>
                <IconButton>
                  <RotateLeftIcon fontSize="large" style={{ color: 'lightcoral' }} onClick={getCadenceDevice}/>
                </IconButton>
              </Toolbar>
      </AppBar>
    );
}

export default Navbar;