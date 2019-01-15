import path from 'path'
import * as config from '@marcopeg/utils/lib/config'
import {
    registerAction,
    createHookApp,
    logBoot,
    SETTINGS,
    FINISH,
} from '@marcopeg/hooks'

// require('es6-promise').polyfill()
// require('isomorphic-fetch')

const services = [
    require('./services/env'),
    require('./services/logger'),
    require('./services/express/locale'),
    require('./services/express/graphql'),
    require('./services/express/socketio'),
    require('./services/express/ssr'),
    require('./services/express'),
]

const features = [
    require('./features/board'),
]

registerAction({
    hook: SETTINGS,
    name: '♦ boot',
    handler: ({ settings }) => {
        settings.express = {
            nodeEnv: config.get('NODE_ENV'),
            port: config.get('SERVER_PORT'),
            graphql: {
                mountPoint: config.get('GRAPHQL_MOUNT_POINT'),
            },
            locale: {
                cookieName: `${String(config.get('APP_ID'))}--locale`,
            },
        }
    },
})

registerAction({
    hook: FINISH,
    name: '♦ boot',
    handler: () => logBoot(),
})

export default createHookApp({
    settings: { cwd: process.cwd() },
    services,
    features,
})
