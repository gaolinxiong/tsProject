const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const configFun = env => {
    return {
        mode: env.NODE_ENV,
        entry: {
            index: './src/index.js'
        },
        devtool: 'inline-cheap-source-map',
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            overlay: {
                errors: true
            },
            open: true,
            hot: true
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            alias: {
                '@': path.resolve('src')
            },
            extensions: ['.js', '.css', '.less', '.vue']
        },
        module: {
            rules:[
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.vue$/,
                    loader:'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        miniCssExtractPlugin.loader,
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader"
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images/', // 图片输出的路径
                            limit: 5 * 1024
                        }
                    }
                },
                {
                    test: /\.less$/,
                    use: [
                        miniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: 'inline'
                            }
                        },
                        {
                            loader: 'less-loader', // 将 Less 编译为 CSS
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        miniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'file-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new miniCssExtractPlugin({
                filename: '[name].css',// 分离后的文件名
                chunkFilename: '[id].css',//
                ignoreOrder: false
            }),
            new OptimizeCSSPlugin({
                cssProcessorOptions: {safe: true, map: false, autoprefixer:false}
            }),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 2,
                        maxInitialRequests: 5,
                    }
                }
            },
            minimizer: [
                // 压缩JS
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                }),
            ]
        }
    }
};

module.exports = (env)=> {
    let config = configFun(env);
    return config;
};
