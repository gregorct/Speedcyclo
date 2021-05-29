let salas = (salas = [], action) => {

    switch(action.type) {
        case 'SET_SALAS' :             
            return action.payload
        default:
            return salas
    }
}

export default salas