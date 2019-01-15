import { getPlayer, removePlayer, updatePlayer } from './memory'
const socket = {
    io: null,
    client: null,
}

export const init = (io, client) => {
    socket.io = io
    socket.client = client

    client.on('player::identity', (id) => { client.playerId = id })

    client.on('disconnect', () => {
        try {
            const player = getPlayer(client.playerId)
            removePlayer(player.id)
            io.emit(`board::${player.boardId}::removePlayer`, player.id)
        } catch (err) {} // eslint-disable-line
    })

    client.on('player::update', (change) => {
        try {
            const player = getPlayer(change.playerId)
            updatePlayer(change.playerId, change.payload)
            io.emit(`board::${player.boardId}::updatePlayer`, change)
        } catch (err) {
            console.log(err.message)
        } // eslint-disable-line
    })
}

export const broadcast = (msg, data) =>
    socket.io.emit(msg, data)
