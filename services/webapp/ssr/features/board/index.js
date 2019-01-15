import { EXPRESS_SOCKETIO_ON_CONNECTION, EXPRESS_GRAPHQL } from 'ssr/services/express/hooks'
import { init as initSocket } from './socket'

import upsertBoardMutation from './upsert-board.mutation'
import upsertPlayerMutation from './upsert-player.mutation'
import debugMemoryQuery from './debug-memory.query'

export const register = ({ registerAction }) => {
    registerAction({
        hook: EXPRESS_SOCKETIO_ON_CONNECTION,
        name: 'board',
        trace: __filename,
        handler: ({ io, client }) =>
            initSocket(io, client),
    })

    registerAction({
        hook: EXPRESS_GRAPHQL,
        name: 'board',
        trace: __filename,
        handler: ({ queries, mutations }) => {
            queries.debugMemory = debugMemoryQuery
            mutations.upsertBoard = upsertBoardMutation
            mutations.upsertPlayer = upsertPlayerMutation
        },
    })
}
