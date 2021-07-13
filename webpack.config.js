const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/main/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public/js'),
        publicPath: '/public/js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
}