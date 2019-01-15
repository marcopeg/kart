
export const initialState = {
    client: null,
    pendingSubscriptions: [],
}

/**
 * Actions
 */

export const SET_CLIENT = 'setClient@socketio'
export const QUEUE_SUBSCRIPTION = 'queueSubscription@socketio'

export const setClient = client => ({
    type: SET_CLIENT,
    payload: { client },
})

export const queueSubscription = (event, handler) => ({
    type: QUEUE_SUBSCRIPTION,
    payload: { event, handler },
})


/**
 * Handlers
 */

export const actionHandlers = {
    [SET_CLIENT]: (state, { payload }) => ({
        ...state,
        client: payload.client,
    }),
    [QUEUE_SUBSCRIPTION]: (state, { payload }) => ({
        ...state,
        pendingSubscriptions: [
            ...state.pendingSubscriptions,
            { ...payload },
        ],
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
