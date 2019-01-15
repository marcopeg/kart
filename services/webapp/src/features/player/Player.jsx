/* eslint-disable */

import React from 'react'
import { connect } from 'react-redux'
import { initPlayer, broadcastAngle } from './player.service'

const mapState = ({ player }, { match }) => ({
    playerId: player.id,
    payload: player.payload,
    errorMsg: player.errorMsg,
})

const mapDispatch = {
    initPlayer,
    broadcastAngle,
}

const PlayerUI = ({
    boardId,
    playerId,
    payload,
    angle,
    onChangeAngle,
}) => (
    <div>
        player - {boardId} - {playerId} - {payload.color}
        <hr />
        <input
            type="range"
            name="points"
            min="-25"
            max="25"
            value={angle}
            onChange={onChangeAngle}
            style={{ width: '90%' }}
        />
    </div>
)

class Player extends React.PureComponent {
    constructor (props) {
        super(props)
        this.state = {
            angle: 0,
        }
    }
    componentDidMount () {
        const { match, initPlayer } = this.props
        initPlayer(match.params.boardId, match.params.playerId)
    }

    onChangeAngle = (evt) => {
        const angle = Number(evt.target.value)
        this.setState({ angle })

        if (this.timer) return
        this.timer = setTimeout(() => {
            this.props.broadcastAngle(angle)
            clearTimeout(this.timer)
            this.timer = null
        }, 10)
    }

    render () {
        const { errorMsg } = this.props
        if (errorMsg) {
            return <div>{errorMsg}</div>
        }

        return (
            <PlayerUI
                {...this.props}
                {...this.state}
                onChangeAngle={this.onChangeAngle}
            />
        )
    }
}

export default connect(mapState, mapDispatch)(Player)
