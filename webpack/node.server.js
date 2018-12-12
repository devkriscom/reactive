const webpack = require('webpack')
const merge = require('webpack-merge');
const path = require('path');

var common = require('./config.js');

module.exports = merge(common, {
	entry: {
		server: ['@babel/polyfill', path.resolve(__dirname, '../source/server.js')]
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	},
	target: "node",
	module: {
		rules: [{
			test: /\.scss$/,
			use:  ["style-loader", "css-loader", 'postcss-loader', "sass-loader"]
		}]
	},
	plugins: [
	new webpack.DefinePlugin({
		'process.env.BROWSER': false
	})]
});
