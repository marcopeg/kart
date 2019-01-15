import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage, JoinPage } from 'features/pages'
import { Board } from 'features/board'
import { Player } from 'features/player'

export default () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/join" component={JoinPage} />
        <Route path="/board/:boardId?" component={Board} />
        <Route path="/player/:boardId/:playerId?" component={Player} />
    </Switch>
)
