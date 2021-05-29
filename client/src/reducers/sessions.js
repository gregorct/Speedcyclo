const sessions = (sessions = [], action) => {
    switch (action.type) {
        case 'GET_SESSIONS' :
            sessions = action.payload
            return sessions 
                
        default:
            return sessions
    }
    
}
export default sessions