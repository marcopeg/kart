import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} from 'graphql'
import GraphQLJSON from 'graphql-type-json'

import { upsertPlayer } from './memory'
import { broadcast } from './socket'

export default {
    description: 'Generates a new player ID for a board',
    args: {
        boardId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        playerId: {
            type: GraphQLID,
        },
    },
    type: new GraphQLObjectType({
        name: 'BoardPlayerId',
        fields: {
            id: {
                type: new GraphQLNonNull(GraphQLID),
            },
            boardId: {
                type: new GraphQLNonNull(GraphQLString),
            },
            payload: {
                type: new GraphQLNonNull(GraphQLJSON),
            },
        },
    }),
    resolve: (params, args, { req, res }) => {
        const player = upsertPlayer(args.boardId, args.playerId)
        broadcast(`board::${player.boardId}::addPlayer`, player)
        return player
    },
}
