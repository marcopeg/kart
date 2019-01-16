import React from 'react'
import PropTypes from 'prop-types'
import Car from './Car'
import Speed from './Speed'

const styles = {
    wrapper: {
        position: 'fixed',
        backgroundColor: '#333',
    },
}

const BoardUI = ({
    width,
    height,
    cars,
    speed,
    setSpeed,
}) => {
    const wrapper = {
        ...styles.wrapper,
        width,
        height,
    }

    return (
        <div style={wrapper}>
            {cars.map(car => (
                <Car
                    {...car}
                    width={width}
                    height={height}
                    key={`car-${car.id}`}
                />
            ))}
            <Speed
                value={speed}
                setValue={setSpeed}
            />
        </div>
    )
}

BoardUI.propTypes = {
    boardId: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    setSpeed: PropTypes.func.isRequired,
    cars: PropTypes.arrayOf(PropTypes.shape({
        angle: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    })).isRequired,
}

export default BoardUI
