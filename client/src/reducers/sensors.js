import {update} from '../utils/SesionAPI'

const sensors = (sensors = {heart: 0, cadence: 0}, action) => {
    update(sensors.heart, sensors.cadence)

    switch(action.type) {
        case 'UPDATE_HEART' :
            return {
                ...sensors,
                    heart: action.payload
            }
        case 'UPDATE_CADENCE' :
            return {
                ...sensors,
                    cadence: action.payload
            }
        default:
            return sensors
    }
}

export default sensors

