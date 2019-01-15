import {
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} from 'graphql'
import GraphQLJSON from 'graphql-type-json'

import { upsertBoard } from './memory'

export default {
    description: 'Upsert a board by ID',
    args: {
        boardId: {
            type: GraphQLID,
        },
    },
    type: new GraphQLObjectType({
        name: 'Board',
        fields: {
            id: {
                type: new GraphQLNonNull(GraphQLID),
            },
            players: {
                type: new GraphQLNonNull(new GraphQLList(new GraphQLObjectType({
                    name: 'BoardPlayer',
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
                }))),
            },
        },
    }),
    resolve: (params, args, { req, res }) =>
        upsertBoard(args.boardId),
}
