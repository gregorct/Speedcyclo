
const user = (user = [], action) => {
    switch (action.type) {
        case 'SET_USER' :
            if(action.finded) {
                return {
                    ...user,
                    username: action.payload.username,
                    birthdate: action.payload.birthdate,
                    numSessions: action.payload.numSessions,
                    totalTime: action.payload.totalTime,
                    points: action.payload.points,
                    loggedIn: true
                    }
                } else {
                    return {
                        ...user,
                        loggedIn: false,
                        username: ''
                    }
                }
        case 'UNSET_USER': 
            return {
                ...user,
                username: null,
                birthdate: null,
                numSessions: null,
                totalTime: null,
                points: null,
                loggedIn: false
            }
        default:
            return user
    }
    
}
export default user