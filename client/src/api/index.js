import axios from 'axios'
import Cookies from 'universal-cookie'
import {getUrl} from '../utils/Url'
const cookies = new Cookies()

const url = `${getUrl()}api/`

const authAxios = axios.create({
    headers: {
        Authorization: `Bearer ${cookies.get('token')}`
    }
})


export const createUser = (newUser) => axios.post(url.concat('users/createuser'), newUser)
export const userLogin = (query) => axios.post(url.concat('users/userlogin'), query)

export const getUser = (user) => authAxios.post(url.concat('users/getuser'), user)
export const findUser = (user) => axios.post(url.concat('users/finduser'), user)

export const deleteUser = (user) => authAxios.post(url.concat('users/deleteuser'), user)
export const createSession = (newSession) => authAxios.post(url.concat('sessions/addsession'), newSession).then().catch((error)=>{console.log(cookies.get('token'))})
export const deleteSession = (session) => authAxios.post(url.concat('sessions/delete'), session)

export const getSessions = (user) => axios.post(url.concat('sessions/'), {username: user})
export const getSessionsInfo = (user) => axios.post(url.concat('sessions/info'), user)
export const getSession = (id) => axios.post(url.concat('sessions/session'), id)