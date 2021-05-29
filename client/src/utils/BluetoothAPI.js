import {store} from '../index'
import {updateHeart, updateCadence} from '../actions/sensors'
import {openPopup, openPopupError} from '../actions/popup'

let BTCadence = null
let BTHeart = null

// Get Heart Device
export const getHeartDevice = async () => {
    BTHeart = await navigator.bluetooth.requestDevice({
        filters: [{
            services: ['heart_rate']
        }]
    })

    store.dispatch(openPopupError("Conectando sensor de pulsación "))

    BTHeart.gatt.connect()
    .then(server => server.getPrimaryService('heart_rate'))
    .then(service => service.getCharacteristic('heart_rate_measurement'))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged',
            nuevaPulsacion)

            store.dispatch(openPopup("Sensor de pulsación conectado con éxito"))
        console.log('Notifications have been started.')
    })
    .catch(error => {
        store.dispatch(openPopup("Ha ocurrido un error en la conexión."))
        console.error(error)
    })
}

// Get Cadence Device
export const getCadenceDevice = async () => {
    BTCadence= await navigator.bluetooth.requestDevice({
        filters: [{
            services: ['cycling_speed_and_cadence']
        }]
    })
    
    store.dispatch(openPopupError("Conectando sensor de cadencia "))

    BTCadence.gatt.connect()
    .then(server => server.getPrimaryService('cycling_speed_and_cadence'))
    .then(service => service.getCharacteristic('csc_measurement'))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged',
        nuevaCadencia)

        store.dispatch(openPopup("Sensor de cadencia conectado con éxito."))
        console.log('Notifications have been started.')
    })
    .catch(error => {
        store.dispatch(openPopup("Ha ocurrido un error en la conexión."))
        console.error(error)
    })
  }

// Nueva Pulsación
var contBtHeart = 0
var anteriorPulsacion = 0
function nuevaPulsacion(e){       
    const value = parseHeartRate(e.currentTarget.value).heartRate
    if(anteriorPulsacion === value) {
        contBtHeart = contBtHeart + 1
    }else{
        contBtHeart = 0
    }
    anteriorPulsacion = value
    
    if(contBtHeart >= 20) {
        //contBtHeart = 0
        //resetBtHeart()
    }
    store.dispatch(updateHeart(value))
}


// Nueva Cadencia
var cadenciaAnterior
function nuevaCadencia(e){
  const value = parseCadence(e.currentTarget.value, cadenciaAnterior)
  cadenciaAnterior = value
  store.dispatch(updateCadence(value))

}

// // Reconexión Heart Device
// const resetBtHeart = () => {
//     BTHeart.gatt.connect()
//     .then(server => server.getPrimaryService('heart_rate'))
//     .then(service => service.getCharacteristic('heart_rate_measurement'))
//     .then(characteristic => characteristic.startNotifications())
//     .then(characteristic => {
//         characteristic.addEventListener('characteristicvaluechanged',
//             nuevaPulsacion)
//         console.log('Resesetado Bt Heart Device.')
//     })
//     .catch(error => {
//         store.dispatch(openPopup("Ha ocurrido un error en la reconexión."))
//         console.error(error)
//     })
// } 

// Parse Heart Rate
function parseHeartRate(value) {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = value.buffer ? value : new DataView(value);
    let flags = value.getUint8(0);
    let rate16Bits = flags & 0x1;
    let result = {};
    let index = 1;
    if (rate16Bits) {
        result.heartRate = value.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    } else {
        result.heartRate = value.getUint8(index);
        index += 1;
    }
    let contactDetected = flags & 0x2;
    let contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
        result.contactDetected = !!contactDetected;
    }
    let energyPresent = flags & 0x8;
    if (energyPresent) {
        result.energyExpended = value.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    }
    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
        let rrIntervals = [];
        for (; index + 1 < value.byteLength; index += 2) {
            rrIntervals.push(value.getUint16(index, /*littleEndian=*/ true));
        }
        result.rrIntervals = rrIntervals;
    }
    return result;
}

// Parse Cadence

var lastCrank = -1
var lastTimeCrank = 0
var diff = 0
var cont = 0

function parseCadence(value, last) {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = value.buffer ? value : new DataView(value)
    //let flag = value.getUint8(0)

    //let speedType = flag & 0x1;
            //let cadenceType = flag & 0x2;

    let result = {}
    result.crank = value.getUint16(1, true)

    // 64 sg 1/1024 2^16
    result.time = value.getUint16(3, true)


    if (lastCrank === -1) {
        //console.log("Primera Pedalada")
        lastCrank = result.crank
        lastTimeCrank = result.time
        return 0
    } else if(lastCrank !== result.crank){
        //console.log("Nueva Pedalada")
        cont = 0
        diff = getDiff(lastTimeCrank, result.time)
        var msPerMinute = 61440;
        lastCrank = result.crank
        let cadencia = Math.round(msPerMinute / diff)

        //console.log("Anterior: " + lastTimeCrank + " Actual: " + result.time + " diff: " + diff + " cuenta: " + msPerMinute / diff)
        lastTimeCrank = result.time 
        return cadencia
    } else {
        if(cont >= 8){
            //console.log("Has dejado de pedalear")
            cont = 0
            return 0
        } else {
            //console.log("Contador Sumando")
            cont++
            return last
        }
    }
}


function getDiff(anterior, nuevo) {
  let maxMs = 65535
  let result = 0
  if (nuevo < anterior) {
    result = (nuevo + maxMs) - anterior
    //console.log(`Vuelta contador (${anterior}, ${nuevo}}): ${(nuevo + maxMs)} - ${anterior} = ${result}`)
  } else {
    result = nuevo - anterior
    //console.log(`Contador (${anterior}, ${nuevo}}): ${nuevo} - ${anterior} = ${result}`)
  }

  //console.log(`GetDiff: Tiempo Anterior: ${anterior} Tiempo Nuevo: ${nuevo} Resultado: ${result}`)
  return result
}

