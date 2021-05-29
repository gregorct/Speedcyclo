import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Typography, Paper} from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator';


function ZonaUsuario() {

    const getColor = (key) => {
        switch (key) {
            case 1:
                return '#5DADE2'
            case 2:
                return '#58D68D'
            case 3:
                return '#F7DC6F'
            case 4:
                return '#E67E22'
            case 5:
                return '#E74C3C'
            default:
                    return
        }
    }

    const user = useSelector((state)=>state.user)
    const valoresActuales = useSelector((state=>state.sensors))
    const [color, setColor] = useState(getColor(1))
    const [text, setText] = useState("Suave")

    function calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
    
        return edad;
    }

    const zonaFcm = (valor, fecha) => {
        let fcm = 220-calcularEdad(fecha)
        let z4 = fcm*0.6
        let z3 = fcm*0.7
        let z2 = fcm*0.8
        let z1 = fcm*0.9

        if(valor < z4) {
            return 1
        }
        if(valor >= z4 && valor < z3) {
            return 2
        }
        if(valor >= z3 && valor < z2) {
            return 3
        }
        if(valor >= z2 && valor < z1) {
            return 4
        }
        if(valor >= z1) {
            return 5
        }
        
    }

    const updateZone = (ppm, fecha) => {
        let zona = zonaFcm(ppm, fecha)
        setColor(getColor(zona))
        switch (zona) {
            case 1:
                setText('Muy suave')
                return
            case 2:
                setText('Suave')
                return 
            case 3:
                setText('Moderada')
                return 
            case 4:
                setText('Intensa')
                return 
            case 5:
                setText('Máxima')
                return 
            default:
                return
        }
        
    }

    useEffect(()=>{
        updateZone(valoresActuales.heart, user.birthdate)
    })

    

    
    return (
        <Paper style={{backgroundColor: fade(color, 1), textAlign: 'center', padding: '8px'}}>
            <Typography variant="h4" color="initial"> {text} </Typography>
        </Paper> 
    )
}

export default ZonaUsuario