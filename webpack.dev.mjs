import {merge} from 'webpack-merge';
import common from './webpack.common.mjs';
import path from 'path';

const localProxy = {
    target: 'http://localhost:8081',
    changeOrigin: true,
    secure: false,
};

export default merge(common, {
    mode: 'development',
    devServer: {
        allowedHosts: 'auto',
        static: [
            {directory: path.join(process.cwd(), 'public'), watch: false},
            {directory: process.cwd(), watch: false}
        ],
        hot: true,
        proxy: [
            {context: ['/api'], ...localProxy},
        ],
        watchFiles: 'src/**/*',
    },
    devtool: 'source-map',
});
