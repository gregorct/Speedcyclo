import React from 'react'
import {useState} from 'react'
import {Typography, Paper, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import Pagination from '@material-ui/lab/Pagination'
import Session from './Session'
import {getSessions} from '../actions/sessions'

function ListaSesiones() {
    const [llamando, setLlamando] = useState(true)
    const dispatch = useDispatch()
    const sessions = useSelector((state)=>state.sessions)
    const user = useSelector((state)=>state.user)
    const [countPage, setCountPage] = useState(0)

    if(llamando){
        setLlamando(false)
        dispatch(getSessions())
    }

    const handleChange = (event, page)=>{
        setCountPage(page-1)
    }

    
    

    

    
    return (
        <Paper style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '8px'}}>
        
            <Typography variant="h4" color="initial">Sesiones: {user.numSessions} </Typography>

            <Grid container spacing={1} style={{maxHeight: '75vh', overflow: 'auto'}}  >
            {sessions.slice(countPage*6, (countPage*6)+6).map((session)=>(                
                <Grid item xs={12} sm={6}>
                    <Session id={session._id} />
                </Grid>
                

            ))}

            </Grid>
            <Grid container spacing={1} justify='center'>
                <Grid item>
                <Pagination style={{marginTop: '8px'}} onChange={handleChange} count={Math.ceil(user.numSessions/6)} color="primary" />
                </Grid>
            </Grid>
            
        </Paper>
    )
}

export default ListaSesiones