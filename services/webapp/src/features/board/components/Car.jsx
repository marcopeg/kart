/* eslint-disable */

import React from 'react'

const baseStyle = {
    position: 'absolute',
    display: 'inline-block',
    transition: 'transform 0.15s linear',
}

const Car = ({ width, height, posX, posY, color, angle }) => {
    const base = width > height ? width : height
    const style = {
        ...baseStyle,
        width: base * 0.05,
        height: base * 0.07,
        top: posY * height / 1000,
        left: posX * width / 1000,
        borderTopLeftRadius: base * 0.05,
        borderTopRightRadius: base * 0.05,
        backgroundColor: color,
        transform: `rotate(${angle}deg)`,
    }

    return (
        <div style={style} />
    )
}

export default Car

// posX : 1000 = ? : width
// ? poxX * width / 1000
