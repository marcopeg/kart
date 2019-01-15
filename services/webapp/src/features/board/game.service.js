/* eslint-disable */

import { updateCars } from './board.reducer'
let frameId = null
let count = 0

const randomNumber = (min, max) =>
    Math.round(Math.random() * (max - min) + min)

export const loop = (dispatch, getState) => async () => {
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
        const radians = (car.angle - 90) / 180 * Math.PI
        car.posX += 3 * Math.cos(radians)
        car.posY += 3 * Math.sin(radians)

        // console.log(car.angle, radians)
        
        // console.log(car.angle, Math.sin(car.angle), Math.cos(car.angle))

        return car
    })

    // console.log(newCarsList)
    dispatch(updateCars(newCarsList))

    // if (count > 30) return
    // count++

    await new Promise(resolve => setTimeout(resolve, 10))
    frameId = window.requestAnimationFrame(loop(dispatch, getState))
}

export const start = () => (dispatch, getState) => {
    frameId = window.requestAnimationFrame(loop(dispatch, getState))
}
