const HtmlWebPackPlugin = require('html-webpack-plugin');
const rules = [
    {
        test: /\.html$/,
        use: [
            {
                loader: 'html-loader'
            }
        ]
    },
    {
        test: /\.js$/,
        use: {
            loader: 'babel-loader'
        }
    }
];
const plugins = [
    new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
    })
];
const config = {
    module: {
        rules: rules,
    },
    plugins: plugins
};

module.exports = config;