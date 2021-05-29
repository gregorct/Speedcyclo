import React from 'react';
import {useDispatch} from 'react-redux'
import {userLogout} from '../actions/user'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'

import {IconButton, Menu, Box, MenuItem, Divider} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'




function Perfil() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user)
    const history = useHistory()

    const cerrarSesion = () => {
     
        dispatch(userLogout())
        setAnchorEl(null)
        history.push('/')
        
    }

    const misSesiones = () => {

        history.push('/sesiones')
        setAnchorEl(null)
    }

    const perfil = () => {
        history.push('/perfil')
        setAnchorEl(null)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
      }

      const handleClose = () => {
        setAnchorEl(null)
      }

    return (
        <Box>

        
        <IconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <AccountCircleIcon fontSize="large" style={{ color: 'lightcoral' }} />
        </IconButton>
        <Menu id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={perfil}>Hola, {user.username}</MenuItem>
        <Divider />
        <MenuItem onClick={perfil}>Mi cuenta</MenuItem>
        <Divider />
        <MenuItem onClick={misSesiones}>Mis sesiones</MenuItem>
        <Divider />
        <MenuItem onClick={cerrarSesion}>Cerrar sesion</MenuItem>
        </Menu>
        </Box>
    )
}

export default Perfil;