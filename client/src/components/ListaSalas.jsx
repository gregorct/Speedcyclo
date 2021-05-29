import React from 'react'
import {Paper, List, ListItem, Typography} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {grabarSesion} from '../utils/SesionAPI'




function ListaSalas() {
    const salas = useSelector((state)=>state.salas)
    const history = useHistory()
    const conectarSala = (sala) => {
        grabarSesion()
        history.push(`/sala/${sala}`)

    }
    return (
        <Paper style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '8px'}}>
            <Typography variant="h4" color="initial">Salas</Typography>
            <Typography variant="body1" color="initial">Únete a una sala disponible.</Typography>
            <List style={{maxHeight: '30vh', overflow: 'auto'}}>
                {(salas !== null && salas.length === 0) && <Typography variant="h6" color="initial">No hay salas disponibles.</Typography>}
                {console.log(salas.length)}
                {salas.map((item)=>(
                    <ListItem key={item.name}>
                        <Paper onClick={()=>{conectarSala(item.name)}} style={{cursor: 'pointer', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: '8px'}}>
                            <Typography variant="h6" color="initial">Sala {item.name} -- Usuarios: {item.num}/8</Typography>
                        </Paper>
                    </ListItem>
                ))}
            </List>
        </Paper> 
    )
}

export default ListaSalas