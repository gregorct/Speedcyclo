import React from 'react'
import {useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import {ResponsiveContainer, AreaChart, Area, Tooltip, XAxis} from 'recharts'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Skeleton from '@material-ui/lab/Skeleton';
import {getSession} from '../api/index'

import {deleteSession} from '../actions/sessions'
import swal from 'sweetalert'
import {Typography, Paper, Grid, IconButton} from '@material-ui/core'

function Session(props) {
    const dispatch = useDispatch()
    const [cargando, setCargando] = useState(true)
    const [llamando, setLlamando] = useState(false)
    const [id, setId] = useState(props.id)

    const [session, setSession] = useState({
        _id: '',
        date: new Date(),
        pulsaciones: [],
        cadencias: [],
        points: 0
    })

    useEffect(()=>{
        if(props.id !== id){
            setId(props.id)
            setLlamando(false)
        }
        

        if(!llamando){
            setLlamando(true)
            getSession({_id: id}).then((session)=>{
                setId(session.data[0]._id)
                setSession(session.data[0])
                setCargando(false)
            })
        }


    }, [props.id, id, llamando, session._id])
    

    const parselegend = (time) => {
        // var hora
        var minutos
        var segundos


        if(time < 3600) {
            minutos = Math.trunc(time/60)
            segundos = time % 60
            let fmin =  minutos.toLocaleString('es-ES', {
                minimunIntegerDigits: 2,
                useGrouping: false
            })

            let fsec =  new Intl.NumberFormat('es-ES', {
                minimunIntegerDigits: 2,
                useGrouping: false
            }).format(segundos)

            return `${fmin}:${fsec}`
        }
    }


const parseArray = (array1, array2) => {
    let newArray = []
    for (let i = 0; i < array1.length; i++) {
        newArray.push({
            name: parselegend(i),
            ppm: array1[i],
            rpm: array2[i]
        })        
    }   
    return newArray
}

const parseSeconds = (value) => {
        
    // comprobar si es menos de una hora
    let restante
    let horas
    let minutos
    let segundos


    if(value < 3600) {
        minutos = Math.trunc(value/60)
        segundos = value % 60
        return `${minutos} min ${segundos} seg`
    } else {
        segundos = value % 60
        restante = Math.trunc(value/60)

        minutos = restante % 60
        horas = Math.trunc(restante/60)
        return `${horas} h ${minutos} min ${segundos} seg`
    }
}

    const parseDate = (date) => {
        
        let msec = Date.parse(date)
        let myDate = new Date(msec)
        return myDate.toLocaleDateString('es-ES')
    }

    const deleteThisSession = (id) => {
        swal({
            title: "Borrar sesión",
            dangerMode: true,
            text: "¿Estás seguro?",
            icon: "warning",
            buttons: ['Cancelar', 'Sí']

        }).then((value)=>{
            if(value){
                dispatch(deleteSession(id))
                swal({
                    title: "Sesión borrada correctamente",
                    icon: "success"    
                })
            }            
        })
    }
    return (
        <Paper style={{cursor: 'pointer', backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: '8px'}}>
            {cargando ? (
                <Skeleton variant="rect" width='100%' height={190} />
            ) : (
                <div>
                <Grid
              container
              spacing={1}
              direction="row"
              justify="space-between"           
            >
              <Grid item>
              <Typography variant="body2" color="initial">Fecha: {parseDate(session.date)}</Typography>
                    <Typography variant="body2" color="initial">{parseSeconds(session.pulsaciones.length)}</Typography>
                    <Typography variant="body2" color="initial">{(session.points===0)?("Sesión Privada"):(`Puntos: ${session.points} pts`)}</Typography>
              </Grid>
              <Grid item>
               <IconButton onClick={()=>{deleteThisSession(session._id)}}> 
                 <DeleteForeverIcon /> 
                 </IconButton>
              </Grid>
            </Grid>
                    
                    
                    <ResponsiveContainer height={130}>
                        <AreaChart  data={parseArray(session.pulsaciones, session.cadencias)}>

                            <defs>
                                <linearGradient id="colorPpm" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="10%" stopColor="#8884d8" stopOpacity={1}/>
                                    <stop offset="90%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorRpm" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="10%" stopColor="#82ca9d" stopOpacity={1}/>
                                    <stop offset="90%" stopColor="#82ca9d" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area yAxisId="ppm" type="monotoneX" dataKey="ppm" stroke="#8884d8" fillOpacity={1} fill="url(#colorPpm)" />
                            <Area yAxisId="rpm" type="monotoneX" dataKey="rpm" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRpm)" />
                            <Tooltip />
                            <XAxis dataKey="name" />
                        </AreaChart>
                        
                    </ResponsiveContainer>
                    </div>
            )}
                </Paper>
    )
}

export default Session