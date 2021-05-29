const popup = (popup = {visible: false, texto: "Prueba", charge: false}, action) => {

    switch(action.type) {
        case 'OPEN_POPUP' :
            return {
                ...popup,
                    visible: true,
                    texto: action.payload,
                    charge: false
            }
        case 'OPEN_POPUP_ERROR' :
            return {
                ...popup,
                    visible: true,
                    texto: action.payload,
                    charge: true
            }
        case 'CLOSE_POPUP' :
            return {
                ...popup,
                    visible: false,
                    charge: false
            }
        default:
            return popup
    }
}

export default popup

