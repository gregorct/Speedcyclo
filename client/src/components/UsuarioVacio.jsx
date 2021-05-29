import React from 'react'
import {Typography, Paper, Grid} from '@material-ui/core'
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';

function UsuarioVacio() {
    return (
        <Paper style={{padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.4)', height: '96px'}}>
            <Grid
            style={{textAlign: 'center'}}
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              
              
            >
                <Grid item xs={12}>
                    <Typography style={{color: 'rgba(0, 0, 0, 0.4)'}} variant="h5" color="initial">Libre</Typography>
                </Grid>

                <Grid item xs={12}>
                    <DirectionsBikeIcon style={{fontSize:'60px', color: 'rgba(0, 0, 0, 0.4)'}}/>
                </Grid>
              
            </Grid>
            
            
        </Paper>
    )
}

export default UsuarioVacio