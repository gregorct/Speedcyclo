const timer = (timer = {time: 0}, action) => {
    switch (action.type) {
        case 'UPDATE_TIMER' :
            return {
                ...timer,
                time: action.payload
            }
                
        default:
            return timer
    }
    
}
export default timer

