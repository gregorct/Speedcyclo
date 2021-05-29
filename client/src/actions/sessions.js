import * as api from '../api'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getSessions = () => async(dispatch) =>{
    try {
        const {data} = await api.getSessions(cookies.get('username'))
        
        dispatch({type: 'GET_SESSIONS', payload: data})
    } catch (error){
        console.log(error.message)
    }
}

export const deleteSession = (id) => async(dispatch) =>{
    try {

        const username = cookies.get('username')
        api.deleteSession({
            _id: id, 
            username : username
        })
        .then((data)=>{
            api.getSessions(username)
            .then((data) => {
                dispatch({type: 'GET_SESSIONS', payload: data.data})
            })
            .then(()=>{
                api.getUser({username: username})
                .then((data) => {
                    dispatch({type: 'SET_USER', payload: data.data, finded: true})
                })
            })
        })


        
        
    } catch (error) {
        console.log(error.message)
    }
}