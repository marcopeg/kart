/* eslint-disable */

import React from 'react'
import { connect } from 'react-redux'
import { initBoard } from './board.service'

import MobilePage from 'components/MobilePage'
import BoardUI from './components/BoardUI'

const mapState = ({ board }, { match }) => ({
    boardId: board.id,
    cars: board.carsList,
})

const mapDispatch = { initBoard }

class Board extends React.PureComponent {
    componentDidMount () {
        const { initBoard, match } = this.props
        initBoard(match.params.boardId)
    }

    render () {
        if (!this.props.boardId) {
            return 'loading...'
        }

        return (
            <MobilePage>
                <MobilePage.Body>
                    {dimensions => (
                        <BoardUI
                            {...dimensions}
                            {...this.props}
                        />        
                    )}
                </MobilePage.Body>
            </MobilePage>
        )
    }
}

export default connect(mapState, mapDispatch)(Board)
