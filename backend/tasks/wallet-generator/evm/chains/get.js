import { fs } from 'fs'
import { appRoot } from 'app-root-path'
import { Config } from './networkConfig'

const buildNetwork = () => {
    const networks = {}
    const __dir = `${appRoot}/config/chains`
    const files = fs.readdirSync(__dir)

    files.forEach(file => {
        const info = require(`${__dir}/${file}`)
        const network_id = require('path').parse(file).name

        networks[info.name] = Config(
            network_id,
            info.rpc
        )
    });

    return networks
}