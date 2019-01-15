import createSSRState from '@marcopeg/react-ssr/lib/create-ssr-state'

const features = [
    require('features/storage'),
    require('features/network'),
    require('features/socket.io'),
    require('features/locale'),
    require('features/pages'),
    require('features/board'),
    require('features/player'),
]

const app = (state = {
    title: 'Kart',
}) => state

export const createState = createSSRState({ app }, features)
