
export const reducers = {
    socketio: require('./socket.io.reducer').default,
}
export const services = [
    require('./socket.io.service'),
]
export const listeners = []

export { subscribe, emit } from './socket.io.service'
