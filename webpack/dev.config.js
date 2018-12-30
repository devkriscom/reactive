const webpack = require('webpack')
const merge = require('webpack-merge');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var common = require('./config.js');
var indexDir = path.join(__dirname, '../');
module.exports = merge(common, {
	entry: {
		client: path.resolve(__dirname, '../src/broswer.js')
	},
	output: {
		pathinfo: false
	},
	devServer: {
		contentBase: indexDir,
		historyApiFallback: true,
		inline: true,
		open: true,
		port: 8080,
		compress: true
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use:  ["style-loader", "css-loader", 'postcss-loader', "sass-loader"]
		}]
	},
	plugins: [
	new BundleAnalyzerPlugin(),
	new webpack.DefinePlugin({
		'process.env.BROWSER': true
	})]
});
