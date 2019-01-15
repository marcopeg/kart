import socketIO from 'socket.io-client'
import { setClient, queueSubscription } from './socket.io.reducer'

export const subscribe = (event, handler) => (dispatch, getState) => {
    const { client } = getState().socketio
    if (client) {
        client.on(event, handler)
    } else {
        dispatch(queueSubscription(event, handler))
    }
}

export const emit = (event, data = null) => (dispatch, getState) => {
    const { client } = getState().socketio
    if (client) {
        client.emit(event, data)
    } else {
        console.log('queue emit', event, data)
        // dispatch(queueSubscription(event, handler))
    }
}

// @TODO: re-run all the pending subsctiptions?
export const init = () => (dispatch) => {
    const io = socketIO()
    dispatch(setClient(io))
}
