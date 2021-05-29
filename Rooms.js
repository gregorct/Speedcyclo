let rooms = null
const salasPermanentes = ["Indurain", "Contador", "Valverde"]

export const startRooms = () => {
    rooms = new Map()
    createRoom(salasPermanentes[0])
    createRoom(salasPermanentes[1])
    createRoom(salasPermanentes[2])
    console.log("Sistema iniciado")
}

export const createRoom = (idRoom) => {
    rooms.set(idRoom, new Map())
}

export const deleteRoom = (idRoom) => {
    rooms.delete(idRoom)
}

export const getRooms = () => {
    let arrayRoom = []
    Array.from(rooms.keys()).forEach(room => {
        if(getNumUsersRoom(room) != 8){
            arrayRoom.push({
                name: room,
                num: getNumUsersRoom(room)
            })
        }        
    })
    return arrayRoom
}

export const getRoomValues = (idRoom) => { 
    return Array.from(rooms.get(idRoom).values()).sort((a, b) => {
        if(a.P < b.P) {
            return 1
        }
        if(a.P > b.P) {
            return -1
        }

        return 0
    })
}

export const getNumUsersRoom = (idRoom) => {
    return Array.from(rooms.get(idRoom).values()).length
}

export const joinUser = (idRoom, idUser, username) => {
    if(rooms.has(idRoom)){
        if(getNumUsersRoom(idRoom) != 8) {
            rooms.get(idRoom).set(idUser, {U: username, H: 0, C: 0, P: 0})
            return true
        }else {
            return false
        }       
    } else {
        createRoom(idRoom)
        rooms.get(idRoom).set(idUser, {U: username, H: 0, C: 0, P: 0})
        return true
    }
    
}

export const leaveUser = (idRoom, idUser) => {
    rooms.get(idRoom).delete(idUser)
    if(getNumUsersRoom(idRoom) == 0 && idRoom != salasPermanentes[0] && idRoom != salasPermanentes[1] && idRoom != salasPermanentes[2]) {
        deleteRoom(idRoom)
    }
}

export const updateUserValues = (idRoom, idUser, data) => {
    rooms.get(idRoom).set(idUser, data)
}