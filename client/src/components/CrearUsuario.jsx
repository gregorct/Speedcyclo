import React from 'react'
import {useState} from 'react'
import {Dialog, Grid, TextField, Button, Box} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import md5 from 'md5'
import {createUser} from '../actions/user'
import {findUser} from '../api/index'
import {openPopup} from '../actions/popup'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

function CrearUsuario(props) {
    const dispatch = useDispatch()

    const { onClose, selectedValue, open } = props

    // Estado del componente

    const [datosSignUp, setDatosSignUp] = useState({
        username: '',
        password: '',
        password2: ''
    })

    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleDateChange = (date) => {
        setSelectedDate(date);
      }


    const [userError, setUserError] = useState(false)
    const [textUserError, setTextUserError] = useState("")

    const [passwordError, setPasswordError] = useState(false)
    const [textPasswordError, setTextPasswordError] = useState("")

    const [password2Error, setPassword2Error] = useState(false)
    const [textPassword2Error, setTextPassword2Error] = useState("")

    const [passwordFlag, setPasswordFlag] = useState(false)
    const [fieldsFlag, setFieldsFlag] = useState(false)

    // Funciones para controlar el componente

    const handleClose = () => {
        onClose(selectedValue);
    }

    const handleChangeSignUp = (input) => {
        if(input.target.name === 'username'){
            input.target.value = input.target.value.toLowerCase()
        }

        setDatosSignUp({
            ...datosSignUp,
            [input.target.name] : input.target.value
        })
        clearError()

    }

    const userExists = async () => {
        const user = await findUser({
            username: datosSignUp.username
        })

        if(user.data != null) {
            setUserError(true)
            setTextUserError("El usuario ya existe")
        } else {
            setUserError(false)
            setTextUserError("")
        }
    }

    const completed = () => {
        if(fieldsFlag) {
            dispatch(openPopup("Rellene los campos."))
        }
        if(datosSignUp.username === '') {
            setUserError(true)
            setTextUserError("Requerido")
            setFieldsFlag(true)
            return false
        }

        if(datosSignUp.password === '') {
            setPasswordError(true)
            setTextPasswordError("Requerido")
            setFieldsFlag(true)
            return false
        }

        if(datosSignUp.password2 === '') {
            setPassword2Error(true)
            setTextPassword2Error("Requerido")
            setFieldsFlag(true)
            return false
        }
        return true
    }

    const clearError = () => {
        setUserError(false)
        setPasswordError(false)
        setPassword2Error(false)
        setTextUserError("")
        setTextPasswordError("")
        setTextPassword2Error("")
        setFieldsFlag(false)
        setPasswordFlag(false)

    }

    const userErrorCheck = () => {
        // Esta función es llamada cuando se ignora la advertencia del campo del usuario
        if(userError) {
            dispatch(openPopup("El usuario ya existe."))
            return false
        }else {
            return true
        }
    }

    const passwordCheck = () => {
        if(datosSignUp.password === datosSignUp.password2){
            return true
        } else {
            if(passwordFlag) {
                dispatch(openPopup("La contraseña no coincide."))
                return false
            } else {
                setPasswordFlag(true)
                setPassword2Error(true)
                setTextPassword2Error("La contraseña no coincide.")
                return false
            }
        }
    }

    const crearUsuario = () => {
        // Comprueba que los campos esten rellenados
        if(!completed()) return

        // Comprueba que el usuario no exista
        if(!userErrorCheck()){
            dispatch(openPopup("Utilize otro nombre de usuario."))
            return
        }

        // Comprueba que las contraseñas sean iguales
        if(!passwordCheck()) return

        const newUser = {
            username: datosSignUp.username,
            birthdate: selectedDate,
            password: md5(datosSignUp.password)
        }
        dispatch(createUser(newUser))   
        dispatch(openPopup(`Bienvenid@ ${datosSignUp.username}`))    
    }
    
    const handleKeyEnter = (event) => {
        if(event.key === 'Enter') {
            crearUsuario()
        }
    }
    
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <Box m={2}>
            <Grid container
                direction="column"
                spacing={2}
            >
                    <Grid item>
                        <TextField
                        name="username"
                        label="Usuario"
                        onChange={handleChangeSignUp}
                        onBlur={userExists}
                        error={userError}
                        helperText={textUserError}                    
                        />
                    </Grid>

                    <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Fecha de nacimiento"
                                format="dd/MM/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <TextField
                        name="password"
                        type="password"
                        label="Contraseña"
                        onChange={handleChangeSignUp} 
                        error={passwordError}
                        helperText={textPasswordError}                                               
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        name="password2"
                        type="password"
                        label="Repite la contraseña"
                        onChange={handleChangeSignUp}
                        onKeyPress={handleKeyEnter}
                        error={password2Error}
                        helperText={textPassword2Error}                           
                        />
                    </Grid>
                    <Grid item>
                        <Button onClick={crearUsuario} variant="contained" color="default" fullWidth style={{backgroundColor: 'lightgreen'}}>
                        Crear usuario
                        </Button>
                    </Grid>
                </Grid>
                </Box>
        </Dialog>
    )
}


export default CrearUsuario;