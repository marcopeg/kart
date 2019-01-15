import loadable from 'react-loadable'

export const reducers = {
    board: require('./board.reducer').default,
}
export const services = [
    require('./game.service'),
]
export const listeners = []

const Loading = () => null

export const Board = loadable({
    loader: () => import(/* webpackChunkName: "Board" */ './Board'),
    loading: Loading,
})
