import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    wrapper: {
        position: 'fixed',
        bottom: 10,
        right: 10,
        color: 'white',
    },
}

const Speed = ({ value, setValue }) => (
    <div
        style={styles.wrapper}
    >
        <span>{value}</span>
        <input
            type="range"
            name="points"
            min="0"
            max="100"
            value={value}
            onChange={evt => setValue(evt.target.value)}
        />
    </div>
)

Speed.propTypes = {
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
}

export default Speed
