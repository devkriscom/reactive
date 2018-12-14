const webpack = require('webpack')
const merge = require('webpack-merge');
const path = require('path');
const extract = require("mini-css-extract-plugin");

var common = require('./config.js');
module.exports = merge(common, {
	mode: 'production',
	entry: {
		'reactive_server': ['@babel/polyfill', path.resolve(__dirname, '../src/reactive.js')]
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use:  [  extract.loader, 'css-loader', 'postcss-loader', 'sass-loader']
		}]
	},
	plugins: [
	new webpack.DefinePlugin({
		'process.env.BROWSER': false
	})]
});
