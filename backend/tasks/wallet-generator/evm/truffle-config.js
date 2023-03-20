import { appRoot } from 'app-root-path';
import { chains } from './chains/get';

module.exports = {
    contracts_build_directory: `${appRoot}/contracts/abis`,
    networks: chains,
    compilers: {
        solc:{
            version: '0.8.17',
            setting: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    }
}