const webpack = require('webpack')
const merge = require('webpack-merge');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const extract = require("mini-css-extract-plugin");

var common = require('./config.js');

module.exports = merge(common, {
	mode: 'production',
	entry: {
		main: path.resolve(__dirname, '../source/main.js'),
		reactive_client: path.resolve(__dirname, '../src/reactive.js')
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use:  [  extract.loader, 'css-loader', 'postcss-loader', 'sass-loader']
		}]
	},
	plugins: [
	new BundleAnalyzerPlugin(),
	new webpack.DefinePlugin({
		'process.env.BROWSER': true
	})]
});
