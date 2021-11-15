const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        ahp: ['./src/js/ahp.js', './src/scss/styles.scss'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            "window.jQuery": "jquery",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                     MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    ]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../fonts/',
                        publicPath: '../static/fonts'
                    }
                }]
            }
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
};