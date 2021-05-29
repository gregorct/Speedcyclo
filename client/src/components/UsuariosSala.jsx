import React from 'react'
import {Grid} from '@material-ui/core'
import { useEffect, useRef, useState} from "react"
import {setSocket, deleteSocket, setUsername} from '../utils/SesionAPI'
import socketIOClient from "socket.io-client"
import Cookies from 'universal-cookie'
import {useHistory} from 'react-router-dom'
import Usuario from './Usuario'
import UsuarioVacio from './UsuarioVacio'
import swal from 'sweetalert'
import {getUrl} from '../utils/Url'


function UsuariosSala(props) {
    const usuariosIniciales = Array(8).fill({U: "Vacio", H: 0, C: 0, P: 0})
    const cookies = new Cookies()
    const SOCKET_SERVER_URL = getUrl()
    const socketRef = useRef();
    const [values, setValues] = useState(usuariosIniciales);
    const username = cookies.get('username')
    const history = useHistory()
    

    useEffect(() => {
        setUsername(username)
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
          query: { type: 'user', roomId: props.idSala, username },
        })
        setSocket(socketRef.current)

        socketRef.current.on("fullRoom", ()=>{
          history.push(`/main`)
        })  
        
        socketRef.current.on("userConnected", (user)=>{
          if(user !== username) {
            swal({
              text: `${user} ha entrado en la sala.`,
              button: false,
              timer: 1000
            })
          }
          
        })

        socketRef.current.on("userDisconnected", (user) =>{
          if(user !== username) {
            swal({
              text: `${user} ha salido.`,
              button: false,
              timer: 1000
            })
          }
        })
    
        socketRef.current.on("newValues", (data) => {
            let array = data
            const length = array.length
            if(length !== 8) {
                for (var i = 0; i < 8 - length; i++) {
                    array.push({U: "Vacio", H: 0, C: 0, P: 0})
                 }
            }
            setValues(array)
        })
    
        return () => {
          socketRef.current.disconnect()
          deleteSocket()
        };
      }, [username, props.idSala, history])


    return (
        <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              
            >
                {values.map((user, index)=>(
                    <Grid item xs={6} md={3}>
                    {(user.U !== 'Vacio') ? (
                      <Usuario index={index} U={user.U} H={user.H} C={user.C} P={user.P} />
                    ) :
                      (
                        <UsuarioVacio />
                      )
                    }
                </Grid> 
                ))}
                        
            </Grid>
    )
}

export default UsuariosSala