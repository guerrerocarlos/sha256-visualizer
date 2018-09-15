const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const config = require('./config')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const utils = require('./build/utils')

const webpackConfig = {
    mode: 'development',
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    plugins: [
        //     // new webpack.DefinePlugin({
        //     //   'process.env': require('../config/dev.env')
        //     // }),
        //     // new webpack.HotModuleReplacementPlugin(),
        //     // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        //     // new webpack.NoEmitOnErrorsPlugin(),
        //     // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: "SHA256"
        }),
        //     // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
};

module.exports = webpackConfig
// module.exports = new Promise((resolve, reject) => {
//     portfinder.basePort = process.env.PORT || config.dev.port
//     portfinder.getPort((err, port) => {
//       if (err) {
//         reject(err)
//       } else {
//         // publish the new Port, necessary for e2e tests
//         process.env.PORT = port
//         // add port to devServer config
//         webpackConfig.devServer.port = port

//         // Add FriendlyErrorsPlugin
//         webpackConfig.plugins.push(new FriendlyErrorsPlugin({
//           compilationSuccessInfo: {
//             messages: [`Your application is running here: http://${webpackConfig.devServer.host}:${port}`],
//           },
//           onErrors: config.dev.notifyOnErrors
//             ? utils.createNotifierCallback()
//             : undefined
//         }))

//         resolve(webpackConfig)
//       }
//     })
//   })
