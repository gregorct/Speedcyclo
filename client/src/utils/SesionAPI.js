import { store} from '../index'
import { updateTimer } from '../actions/timer'

// Variables
var valoresActuales = {
    pulsacion: 0,
    cadencia: 0
}

var intervalo = null
var valores = {
    pulsacion: [],
    cadencia: []
}
var primeraCadencia = false
var jsonData = ""
var socket = null
var username = null
var puntuacion = 0


// Funciones para usuario
export const setUsername = (user) => {
    username = user
}

export const setSocket = (sock) => {
    console.log("LLamada setSocket")
    socket = sock
}

export const deleteSocket = () => {
    socket = null
}

export const sendValues = () => {
    socket.emit("updateValues", {
        U: username,
        H: valoresActuales.pulsacion,
        C: valoresActuales.cadencia,
        P: getPuntuacion(puntuacion)
    })
}

export const getPoints = () => {
    return getPuntuacion(puntuacion)
}

export const getPuntuacion = (value) => {
    // 900 factor de reducción
    return Math.trunc(value / 900)
}



export const update = (h, c) => {
    valoresActuales = {
        pulsacion: h,
        cadencia: c
    }
    if (socket !== null) {
        sendValues()
    }
}

export const getValores = () => {
    while (valores.cadencia[valores.cadencia.length - 1] === 0) {
        valores.cadencia.pop()
        valores.pulsacion.pop()
    }
    return valores
}
// Funciones para intervalos

export const grabarSesion = () => {
    puntuacion = 0
    valores = {
        pulsacion: [],
        cadencia: []
    }

    intervalo = setInterval(() => {
        if (primeraCadencia) {
            valores.pulsacion.push(valoresActuales.pulsacion)
            valores.cadencia.push(valoresActuales.cadencia)
            puntuacion = puntuacion + valoresActuales.cadencia
            store.dispatch(updateTimer(valores.cadencia.length))
        } else {
            if (valoresActuales.cadencia !== 0) {
                primeraCadencia = true
            }
        }

    }, 1000)
}

export const pararSesion = () => {
    console.log("Sesion parada")
    clearInterval(intervalo)
    valores = {
        pulsacion: [],
        cadencia: []
    }
    store.dispatch(updateTimer(valores.cadencia.length))
    primeraCadencia = false

}

// Funciones para guardar datos

export const guardarSesion = () => {
    jsonData = JSON.stringify({
        pulsaciones: valores.pulsacion,
        cadencia: valores.cadencia
    })
    download(jsonData, 'data.json', 'text/plain')
}

function download(content, fileName, contentType) {
    var a = document.createElement("a")
    var file = new Blob([content], {
        type: contentType
    })
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
}