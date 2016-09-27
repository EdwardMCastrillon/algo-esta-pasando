var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3000/',
        'webpack/hot/only-dev-server',
        './src/client'
    ],
    devServer: { // opciones para el servidor de desarrollo
        contentBase: './public',
        inline: true, // para que se recargue automáticamente cuando cambie un archivo
        port: 3000 // puerto donde funcionará el servidor
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
            },

            { test: /\.scss$/,
              loaders: ["style", "css", "autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"]
            },

            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                loader: 'file'
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                BROWSER: JSON.stringify(true)
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}