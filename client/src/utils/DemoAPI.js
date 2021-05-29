import socketIOClient from "socket.io-client"
import {getUrl} from './Url'

// Generador de usuario Dummy
const SOCKET_SERVER_URL = getUrl()
let socket = null
let intervaloDummy = null
let myUsername = null
var puntuacion = 0

let valoresActuales = {
    pulsacion: 0,
    cadencia: 0
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const getPoints = () => {
    return getPuntuacion(puntuacion)
}

export const getPuntuacion = (value) => {
    // 1800 factor de reducción
    return Math.trunc(value / 1800)
}

const sendValues = () => {
    socket.emit("updateValues", {
        U: myUsername,
        H: valoresActuales.pulsacion,
        C: valoresActuales.cadencia,
        P: getPuntuacion(puntuacion)
    })
} 



export const setSocket = (roomId, username) => {
    myUsername = username
    socket = socketIOClient(SOCKET_SERVER_URL, {
        query: { type: 'user', roomId, username },
      })
}

export const deleteSocket = () => {
    clearInterval(intervaloDummy)
    socket.disconnect()
    socket = null
    valoresActuales = {
        pulsacion: 0,
        cadencia: 0
    }
}

export const startDummy = () => {
      intervaloDummy = setInterval(()=>{
        valoresActuales = {
            cadencia: getRandomInt(50, 70),
            pulsacion: getRandomInt(120,160)
        }
        puntuacion = puntuacion + valoresActuales.cadencia
        sendValues()
      }, 1000)
}