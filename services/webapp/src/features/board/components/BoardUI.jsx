import React from 'react'
import PropTypes from 'prop-types'
import Car from './Car'

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
        </div>
    )
}

BoardUI.propTypes = {
    boardId: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cars: PropTypes.arrayOf(PropTypes.shape({
        angle: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    })).isRequired,
}

export default BoardUI
