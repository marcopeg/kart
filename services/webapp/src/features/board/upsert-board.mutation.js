export default `
mutation upsertBoard(
    $boardId: ID
) {
  upsertBoard (boardId: $boardId) {
    id
    players {
      id
      boardId
      payload
    }
  }
}`
