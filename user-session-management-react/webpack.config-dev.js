/* eslint-disable no-console */
const path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');
const publicPath = '/';


const rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                },
            },
            'sass-loader'],
    }

];
const plugins = [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
        {from: 'src/assets', to: 'assets'}
    ]),
    new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
    })

];
const config = {
    resolve: {
        alias: {'src': path.resolve(__dirname, './src')},
        extensions: ['.js']
    },

    devServer: {
        compress: true,
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        proxy: {
            '/alfresco': {
                target: 'http://0.0.0.0:8080',
                secure: false,
                changeOrigin: true,
                onProxyRes: proxyReq => {
                    if(proxyReq.statusCode===401){
                        proxyReq.headers['www-authenticate'] = 'x' + proxyReq.headers['www-authenticate'];
                    }
                }
            }
        }
    },

    module: {
        rules: rules
    },
    plugins: plugins,
    output: {
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: 'static/js/bundle.js',
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: 'static/js/[name].chunk.js',
        // This is the URL that app is served from. We use "/" in development.
        publicPath: publicPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    }

};

module.exports = config;