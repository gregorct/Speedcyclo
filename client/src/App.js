// React
import {BrowserRouter, Switch, Route} from 'react-router-dom'


// Estilos
import './assets/css/App.css'
import 'fontsource-roboto'

// Componentes
import Navbar from './components/Navbar';
import Popup from './components/Popup'
import {Container} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CopyrightIcon from '@material-ui/icons/Copyright'

// Paginas
import Inicio from './pages/Inicio'
import Main from './pages/Main'
import SalaSolitario from './pages/SalaSolitario'
import Sesiones from './pages/Sesiones'
import Sala from './pages/Sala'
import Demo from './pages/Demo'
import Usuario from './pages/Usuario'





function App() {

  return (
    <BrowserRouter>
      <div className="App" style={{ background: 'linear-gradient(30deg, #4959ff 30%, #49b7fe 90%)', minHeight: '100vh' }}>
        <Navbar />
        <Container style={{paddingTop: '16px'}}>
          <Switch>
            <Route exact path='/perfil' component={Usuario} />
            <Route exact path='/demo' component={Demo} />
            <Route exact path='/sala/:idSala' component={Sala} />
            <Route exact path='/sesiones' component={Sesiones} />
            <Route exact path='/sesionsolitario' component={SalaSolitario} />
            <Route exact path='/main' component={Main}/>
            <Route exact path='/' component={Inicio}/>
          </Switch>
          <Popup />
        </Container>
        
        <Typography variant="h5" color="initial" style={{color: 'white', position: 'fixed', bottom: 0, width: '100%', height: 40, textAlign: 'center'}}>
          <CopyrightIcon /> 2021 - Gregorio Cabrera Tamayo
        </Typography> 
              
      </div>
    </BrowserRouter>  
  );
}

export default App;
