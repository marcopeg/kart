/* eslint-disable */

import { updateCars } from './board.reducer'
let frameId = null
let count = 0

const randomNumber = (min, max) =>
    Math.round(Math.random() * (max - min) + min)

export const loop = (dispatch, getState, lastLTime = Date.now()) => async () => {
    const lTime = Date.now()
    const elapsedLTime = lTime - lastLTime
    const { players, playersList, cars, carsList, speed } = getState().board

    const newCarsList = playersList.map((player) => {
        const car = cars[player.id] || {
            id: player.id,
            color: player.payload.color,
            status: player.payload.status,
            angle: randomNumber(0, 360),
            posX: randomNumber(200, 800),
            posY: randomNumber(200, 800),
            // angle: 0,
            // posX: 500,
            // posY: 500,
        }

        car.angle = car.angle + (player.payload.angle / 10)
        // car.angle = player.payload.angle

        // const radians = car.angle * Math.PI / 180
        const delta = (elapsedLTime / 200) * (speed / 3)
        const radians = (car.angle - 90) / 180 * Math.PI
        car.posX += delta * Math.cos(radians)
        car.posY += delta * Math.sin(radians)

        return car
    })

    dispatch(updateCars(newCarsList))
    frameId = window.requestAnimationFrame(loop(dispatch, getState, lTime))
}

export const start = () => (dispatch, getState) => {
    frameId = window.requestAnimationFrame(loop(dispatch, getState))
}
