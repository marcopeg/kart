import { GraphQLNonNull } from 'graphql'
import GraphQLJSON from 'graphql-type-json'
import { getDb } from './memory'

export default {
    description: 'Sends out the whole board memory for debug purpose',
    type: new GraphQLNonNull(GraphQLJSON),
    resolve: (params, args, { req, res }) => getDb(),
}
