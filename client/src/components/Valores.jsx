import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {Typography, Paper, Grid} from '@material-ui/core'
import {useSelector} from 'react-redux'


function Valores() {
    const valoresActuales = useSelector((state=>state.sensors))
    return (
        
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
            >

                <Grid item xs={6}>
                    <Paper style={{backgroundColor: fade('#FFFFFF', 0.1)}}>
                        <Typography variant="h3" color="initial"> <FavoriteIcon style={{fontSize: '40px'}}/> {valoresActuales.heart} ppm</Typography>
                    </Paper>
                    
                </Grid>

                <Grid item xs={6}>
                <Paper style={{backgroundColor: fade('#FFFFFF', 0.1)}}>
                    <Typography variant="h3" color="initial"> <RotateLeftIcon style={{fontSize: '40px'}}/> {valoresActuales.cadence} rpm</Typography>
                    </Paper>
                </Grid>
                
            </Grid>
    );
}

export default Valores;