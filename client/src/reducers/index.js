import {combineReducers} from 'redux'
import user from './user'
import sensors from './sensors'
import sessions from './sessions'
import popup from './popup'
import salas from './salas'
import timer from './timer'

export default combineReducers({
    timer,
    salas,
    user,
    sensors,
    sessions,
    popup
})

