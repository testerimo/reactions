/* eslint-disable */

const { resolve } = require('path');
const autoprefixer = require('autoprefixer');

const config = {
    entry: './src/index.js',

    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'reactions.js',
        library: 'Reactions',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },

    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }]
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.devtool = false;
        config.module.rules[0].use.push({
            loader: 'postcss-loader',
            options: {
                plugins: () => [autoprefixer()]
            }
        });
    }

    return config;
};
