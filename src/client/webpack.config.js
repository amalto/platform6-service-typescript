const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

module.exports = function (env) {
    return {
        entry: [
            // activate HMR for React
            'react-hot-loader/patch',

            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint
            'webpack-dev-server/client?http://0.0.0.0:9090',

            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates
            'webpack/hot/only-dev-server',

            // the entry points of our app
            './core/main.tsx'

        ],

        output: {
            // the output bundle
            filename: 'bundle.js',
            path: path.resolve(__dirname, './node_modules/b2portal-ui/public/assets/generated'),
            // necessary for HMR to know where to load the hot update chunks
            publicPath: '/assets/generated/'
        },

        devtool: 'eval',

        devServer: {
            // activate hot reloading
            hot: true,
            contentBase: path.resolve(__dirname, './node_modules/b2portal-ui/public'),
            compress: true,
            host: "0.0.0.0",
            port: 9090,
            inline: true
        },

        resolve: {
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css']
        },

        externals: {
            'jquery': 'jQuery',
            'pikaday': 'Pikaday',
            'moment': 'moment'
        },

        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loaders: [
                        'react-hot-loader/webpack',
                        'ts-loader'
                    ]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'url-loader'
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/
                }
            ]
        },

        node: {
            fs: 'empty'
        },

        plugins: [
            // activates HMR
            new webpack.HotModuleReplacementPlugin(),

            // prints more readable module names in the browser console on HMR updates
            new webpack.NamedModulesPlugin(),

            new webpack.DefinePlugin({
                COMPONENT: env ? JSON.stringify(env.COMPONENT) : undefined
            }),

            function () {
                this.plugin('done', function (stats) {

                    var replaceBundlePlaceholder = function (filePath) {

                        var str = fs.readFileSync(filePath, 'utf8');

                        var out = str.replace(/<!--SERVICE BUNDLE PLACEHOLDER-->/g, '<script type="text/javascript" src="assets/generated/bundle.js"></script>');

                        fs.writeFileSync(filePath, out);
                    };

                    replaceBundlePlaceholder(path.resolve(__dirname, './node_modules/b2portal-ui/public/index.html'));

                });
            }
        ]
    }
}
