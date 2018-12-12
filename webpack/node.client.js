const webpack = require('webpack')
const merge = require('webpack-merge');
const path = require('path');

var common = require('./config.js');
var indexDir = path.join(__dirname, '../');
module.exports = merge(common, {
	entry: {
		client: path.resolve(__dirname, '../source/broswer.js')
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
	new webpack.DefinePlugin({
		'process.env.BROWSER': true
	})]
});
