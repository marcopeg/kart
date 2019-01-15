export default `
mutation upsertBoard(
    $boardId: ID!
    $playerId: ID
) {
    upsertPlayer (
        boardId: $boardId
        playerId: $playerId
    ) {
        id
        boardId
        payload
    }
}`
