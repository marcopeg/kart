
const db = {
    boards: {},
    boardsId: [],

    players: {},
    playersId: [],
}

const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'cyan',
    'magenta',
    'lime',
]

export const generateDigit = () =>
    Math.round(Math.random() * (9 - 0) + 0)

export const generateId = (length = 6) =>
    Array.from(Array(length))
        .map(generateDigit)
        .join('')

export const generateUniqueId = (length, cached) => {
    const id = generateId(length)
    return cached.indexOf(id) === -1
        ? id
        : generateUniqueId(length)
}

export const getBoard = boardId => {
    if (!db.boards[boardId]) {
        throw new Error('board not found')
    }

    return db.boards[boardId]
}

export const createBoard = (desiredBoardId) => {
    const id = desiredBoardId || generateUniqueId(6, db.boardsId)

    if (db.boardsId.indexOf(id) !== -1) {
        throw new Error('board already exists')
    }

    db.boardsId.push(id)
    db.boards[id] = {
        id,
        players: [],
    }
    return db.boards[id]
}

export const upsertBoard = (boardId) => {
    try {
        return getBoard(boardId)
    } catch (err) {
        return createBoard(boardId)
    }
}

export const getPlayer = (playerId) => {
    if (!db.players[playerId]) {
        throw new Error('player not found')
    }

    return db.players[playerId]
}

export const createPlayer = (boardId, desiredPlayerId) => {
    const board = getBoard(boardId)
    const id = desiredPlayerId || generateUniqueId(6, db.playersId)

    if (db.playersId.indexOf(id) !== -1) {
        throw new Error('player already exists')
    }

    // pick random color, might be improved
    const boardColors = board.players.map(player => player.payload.color)
    const availableColors = colors.filter(color => boardColors.indexOf(color) === -1)
    const color = availableColors[Math.floor(Math.random() * availableColors.length)]

    const player = {
        id,
        boardId,
        payload: {
            color,
            angle: 0, // @TODO: random angle
            status: 1, // 1: alive, -1: dead
        },
    }

    db.playersId.push(id)
    db.players[id] = player

    board.players.push(player)
    return player
}

export const upsertPlayer = (boardId, playerId) => {
    try {
        return getPlayer(playerId)
    } catch (err) {
        return createPlayer(boardId, playerId)
    }
}

export const removePlayer = (playerId) => {
    const player = db.players[playerId]
    if (!player) return

    // remove player from board
    const board = db.boards[player.boardId]
    if (board) {
        board.players = board.players.filter(item => item.id !== player.id)
    }

    delete db.players[playerId]
    db.playersId = db.playersId.filter(item => item !== playerId)
}

export const updatePlayer = (playerId, payload) => {
    const player = db.players[playerId]
    if (!player) throw new Error('player not found')

    player.payload = {
        ...player.payload,
        ...payload,
    }
}

export const getDb = () => JSON.parse(JSON.stringify(db))

export const resetMemory = () => {
    db.boards = {}
    db.boardsId = []
    db.players = {}
    db.playersId = []
}
