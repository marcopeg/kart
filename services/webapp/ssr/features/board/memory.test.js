import { resetMemory } from './memory'
import { generateDigit, generateId } from './memory'
import { createBoard, getBoard } from './memory'
import { createPlayer, getPlayer } from './memory'


describe('board/memory', () => {
    beforeEach(resetMemory)

    it('should generate a random digit', () => {
        const res = generateDigit()
        expect(res).toBeGreaterThanOrEqual(0)
        expect(res).toBeLessThanOrEqual(9)
    })
    it('should generate a board id', () => {
        expect(generateId()).toHaveLength(6)
        expect(generateId(4)).toHaveLength(4)
    })
    it('should create a new board', () => {
        const board = createBoard()
        expect(getBoard(board.id)).toEqual(board)
    })
    it('should throw when accessing a non existing board', () => {
        expect(() => getBoard(1)).toThrow()
    })
    it('should generate a new player in a board', () => {
        const board = createBoard()
        const player = createPlayer(board.id)
        expect(getPlayer(player.id)).toEqual(player)
    })
})
