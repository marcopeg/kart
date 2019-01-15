import { subscribe } from 'features/socket.io'
import { runQuery } from 'features/network'
import { setBoardId, setPlayer, removePlayer, updatePlayer } from './board.reducer'
import upsertBaoardMutation from './upsert-board.mutation'

export const subscribeBoard = (boardId) => (dispatch) => {
    dispatch(subscribe(`board::${boardId}::addPlayer`, player =>
        dispatch(setPlayer(player.id, player))
    ))
    dispatch(subscribe(`board::${boardId}::removePlayer`, playerId =>
        dispatch(removePlayer(playerId))
    ))
    dispatch(subscribe(`board::${boardId}::updatePlayer`, ({ playerId, payload }) =>
        dispatch(updatePlayer(playerId, payload))
    ))
}

export const initBoard = (boardId) => async (dispatch) => {
    const res = await dispatch(runQuery(upsertBaoardMutation, { boardId }))
    const board = res.data.upsertBoard

    dispatch(setBoardId(board.id))
    board.players.forEach(player => dispatch(setPlayer(player.id, player)))

    dispatch(subscribeBoard(board.id))
}
