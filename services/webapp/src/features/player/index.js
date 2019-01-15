import loadable from 'react-loadable'

export const reducers = {
    player: require('./player.reducer').default,
}
export const services = []
export const listeners = []

const Loading = () => null

export const Player = loadable({
    loader: () => import(/* webpackChunkName: "Player" */ './Player'),
    loading: Loading,
})
