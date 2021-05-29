import {store} from '../index'
import Cookies from 'universal-cookie'
import {setUserState} from '../actions/user'
import {getSessions} from '../actions/sessions'
import socketIOClient from "socket.io-client"
import {setSalas} from '../actions/salas'

const cookies = new Cookies()
const SOCKET_SERVER_URL = "https://speecyclo.herokuapp.com/"

let socket = socketIOClient(SOCKET_SERVER_URL, {
    query: { type: "system", roomId: '', username: '' },
  })

export const setState = () => {
    if(cookies.get('token')) {
        store.dispatch(setUserState())
        store.dispatch(getSessions())
    }
}

socket.on("listRooms", (data) => {
    console.log(data)
    store.dispatch(setSalas(data))
})




