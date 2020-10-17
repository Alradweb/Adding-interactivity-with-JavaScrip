const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MyCopyPlugin = require('../MyCopyPlugin')

//const PATH = 'C:/MAMP/htdocs/test'
const PATH = '../dist'

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.js'),
        another: path.resolve(__dirname, '../src/another.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, PATH),
    },
    // optimization: { // ?
    //     splitChunks: {
    //         chunks: 'all',
    //         name: false,
    //     },
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/customer-site/index.html')
        }),
        new MyCopyPlugin({
            src: path.resolve(__dirname, '../src/customer-site'),
            dest: path.resolve(__dirname, PATH)
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|webp|svg|)$/i,
                use: [
                    {
                        loader: `img-optimize-loader`,
                        options: {
                            compress: {
                                // This will take more time and get smaller images.
                                mode: 'high', // 'lossless', 'low'
                                disableOnDevelopment: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            },
        ],
    },
}
