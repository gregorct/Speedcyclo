export const openPopup = (text) => {
    return { type: 'OPEN_POPUP', payload: text }
}

export const closePopup = () => {
    return { type: 'CLOSE_POPUP' }
}

export const openPopupError = (text) => {
    return { type: 'OPEN_POPUP_ERROR', payload: text }
}