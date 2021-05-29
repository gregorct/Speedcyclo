import React from 'react'
import {TextField, Button, Box, Paper, Divider, Typography, Grid} from '@material-ui/core'
import {useState, useEffect} from 'react'
import md5 from 'md5'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../actions/user'
import {useHistory} from 'react-router-dom'
import CrearUsuario from '../components/CrearUsuario'


function Inicio() {
    
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const history = useHistory()
    

    useEffect(()=> {
        if(user.loggedIn) {
            history.push('/main')
        }
    }, [user.loggedIn, history])
    
    

    const [datosLogin, setDatosLogin] = useState({
        username: '',
        password: ''
    })

    const handleChangeLogin =(event) => {
        setDatosLogin({
            ...datosLogin,
            [event.target.name] : event.target.value
        })
    }

    const iniciarSesion = () => {
        const query = {
            username: datosLogin.username,
            password: md5(datosLogin.password)
        }
        dispatch(setUser(query)) 
    }
 
    

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = (value) => {
        setOpen(false);
    }

    const handleKeyEnter = (event) => {
        if(event.key === 'Enter') {
            iniciarSesion()
        }
    }


    return (
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
          style={{ minHeight: '85vh' }}
          
        >
            <Grid item>
                <Typography variant="h4" color="initial" align='center'>Forma parte de la comunidad SpeedCycler</Typography>
            </Grid>
          <Grid item>
          <Paper elevation={10} style={{backgroundColor: 'lightyellow'}}>
              <Box m={2}>
                <Grid 
                    container
                    direction="column"
                    spacing={4}
                    >
                    <Grid item>
                        <TextField
                        name="username"
                        label="Usuario"
                        onChange={handleChangeLogin}                     
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        name="password"
                        type="password"
                        label="Contraseña"
                        onChange={handleChangeLogin}
                        onKeyPress={handleKeyEnter}                          
                        />
                    </Grid>
                    <Grid item>
                        <Button onClick={iniciarSesion} variant="contained" color="default" fullWidth style={{backgroundColor: 'lightgreen'}}>
                        Iniciar Sesión
                        </Button>
                    </Grid>
                    <Grid item>
                        <Divider />
                    </Grid>
                    <Grid item>
                    <Button  onClick={handleClickOpen} variant="contained" color="default" fullWidth style={{backgroundColor: 'lightskyblue'}}>
                       Crear Usuario
                    </Button>
                    <CrearUsuario open={open} onClose={handleClose} />
                    </Grid>
                </Grid>
             </Box>
            </Paper>
          </Grid>
        </Grid>
        
             
    )
}

export default Inicio