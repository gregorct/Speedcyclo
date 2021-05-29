import * as api from '../api'
import Cookies from 'universal-cookie'


const cookies = new Cookies()

export const createUser = (user) => async(dispatch) =>{
    try {
        const {data} = await api.createUser(user)
        dispatch({type: 'SET_USER', payload: data.user, finded: true})
        cookies.set('username', data.user.username, {path: '/'})
        cookies.set('token', data.token, {path: '/'})
    } catch (error){
        dispatch({type: 'OPEN_POPUP', payload: "El nombre de usuario ya existe"})
        console.log(error.message)
    }
}

export const setUser = (query) => async(dispatch) =>{
    try{
        const {data} = await api.userLogin(query)
        const finded = data ? true : false
        if(finded) {
            cookies.set('username', data.user.username, {path: '/'})
            cookies.set('token', data.token, {path: '/'})
        }
        dispatch({type: 'SET_USER', payload: data.user, finded: finded})
    } catch (error) {
        dispatch({type: 'OPEN_POPUP', payload: "Usuario o contraseña incorrectos"})
    }
}

export const setUserState = () => async(dispatch) =>{
    try{
        const username = cookies.get('username')
        api.getUser({username: username})
        .then((user)=>{
            dispatch({type: 'SET_USER', payload: user.data, finded: true})
        })
    } catch (error) {
        dispatch({type: 'OPEN_POPUP', payload: error})
    }
    
}

export const userLogout = () => {
    cookies.remove('username')    
    cookies.remove('token')
    return {type: 'UNSET_USER'}
}

export const deleteUser = (user) => {
        api.deleteUser({
            username: user
        })
        .then((data)=>{
            console.log(data)
            cookies.remove('username')
            cookies.remove('token')
            
        })
        return {type: 'UNSET_USER'}
    
    
    
}