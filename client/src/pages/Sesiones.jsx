import React from 'react'
import ListaSesiones from '../components/ListaSesiones'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function Sesiones() {
    const user = useSelector((state)=>state.user)
    const history = useHistory()

    useEffect(()=> {
        if(!user.loggedIn) {
            history.push('/')
        }
    }, [user.loggedIn, history])
    
    return (
        <ListaSesiones />
    )
}

export default Sesiones