
export const initialState = {
    id: null,
    payload: {},
    errorMsg: null,
}

/**
 * Actions
 */

export const SET_PLAYER = 'setPlayer@player'
export const SET_ERROR_MSG = 'setErrorMsg@player'

export const setPlayer = (id, payload) => ({
    type: SET_PLAYER,
    payload: {
        id: Number(id),
        payload: Object(payload),
    },
})

export const setErrorMsg = msg => ({
    type: SET_ERROR_MSG,
    payload: {
        errorMsg: msg
            ? String(msg)
            : null,
    },
})

/**
 * Handlers
 */

const mergePayload = (state, { payload }) => ({
    ...state,
    ...payload,
})

export const actionHandlers = {
    [SET_PLAYER]: mergePayload,
    [SET_ERROR_MSG]: mergePayload,
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
