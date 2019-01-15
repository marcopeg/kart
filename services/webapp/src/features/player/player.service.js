import { subscribe, emit } from 'features/socket.io'
import { runQuery } from 'features/network'
import upsertPlayerMutation from './upsert-player.mutation'
import { setErrorMsg, setPlayer } from './player.reducer'

export const subscribePlayer = (playerId) => (dispatch) => {
    dispatch(emit(`player::identity`, playerId))
    dispatch(subscribe(`player::${playerId}::data`, (data) => {
        console.log('player ', data)
    }))
}

export const initPlayer = (boardId, playerId) => async (dispatch) => {
    try {
        const res = await dispatch(runQuery(upsertPlayerMutation, { boardId, playerId }))
        const { id, payload } = res.data.upsertPlayer
        dispatch(setPlayer(id, payload))
        dispatch(subscribePlayer(id))
    } catch (err) {
        dispatch(setErrorMsg(err.message))
    }
}

export const broadcastAngle = angle => (dispatch, getState) => {
    const { id } = getState().player
    dispatch(emit(`player::update`, {
        playerId: id,
        payload: { angle },
    }))
}
