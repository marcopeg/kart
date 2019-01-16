
export const initialState = {
    id: null,
    players: {},
    playersList: [],
    cars: {},
    carsList: [],
    speed: 10,
}

/**
 * Actions
 */

export const SET_BOARD_ID = 'setBoardId@board'
export const SET_PLAYER = 'setPlayer@board'
export const SET_SPEED = 'setSpeed@board'
export const REMOVE_PLAYER = 'removePlayer@board'
export const UPDATE_PLAYER = 'updatePlayer@board'
export const UPDATE_CARS = 'updateCars@board'

export const setBoardId = id => ({
    type: SET_BOARD_ID,
    payload: {
        id: Number(id),
    },
})

export const setPlayer = (id, data) => ({
    type: SET_PLAYER,
    payload: {
        id: Number(id),
        data: Object(data),
    },
})

export const setSpeed = (value) => ({
    type: SET_SPEED,
    payload: {
        value: Number(value),
    },
})

export const removePlayer = (id) => ({
    type: REMOVE_PLAYER,
    payload: {
        id: Number(id),
    },
})

export const updatePlayer = (id, change) => ({
    type: UPDATE_PLAYER,
    payload: {
        id: Number(id),
        change: Object(change),
    },
})

export const updateCars = (cars) => ({
    type: UPDATE_CARS,
    payload: { cars },
})


/**
 * Handlers
 */

export const actionHandlers = {
    [SET_BOARD_ID]: (state, { payload }) => ({
        ...state,
        id: payload.id,
    }),
    [SET_PLAYER]: (state, { payload }) => {
        const players = {
            ...state.players,
            [payload.id]: payload.data,
        }
        return {
            ...state,
            players,
            playersList: Object.keys(players).map(id => ({
                ...players[id],
                id,
            })),
        }
    },
    [SET_SPEED]: (state, { payload }) => ({
        ...state,
        speed: payload.value,
    }),
    [REMOVE_PLAYER]: (state, { payload }) => {
        const players = { ...state.players }
        delete players[payload.id]

        return {
            ...state,
            players,
            playersList: Object.keys(players).map(id => ({
                ...players[id],
                id,
            })),
        }
    },
    [UPDATE_PLAYER]: (state, { payload }) => {
        const players = {
            ...state.players,
            [payload.id]: {
                ...state.players[payload.id],
                payload: {
                    ...state.players[payload.id].payload,
                    ...payload.change,
                },
            },
        }

        return {
            ...state,
            players,
            playersList: Object.keys(players).map(id => ({
                ...players[id],
                id,
            })),
        }
    },
    [UPDATE_CARS]: (state, { payload }) => ({
        ...state,
        cars: payload.cars.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
        carsList: [...payload.cars],
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
