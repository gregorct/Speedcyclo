export const updateHeart = (heart) => {
    return { type: 'UPDATE_HEART', payload: heart }
}

export const updateCadence = (cadence) => {
    return { type: 'UPDATE_CADENCE', payload: cadence }
}