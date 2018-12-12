const path = require('path');
const fs = require('fs');
const copy = require('copy-webpack-plugin');
const extract = require("mini-css-extract-plugin");
const clean = require('clean-webpack-plugin');

var entries = {
	main: './script.js'
};

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: entries,
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use:  [  'style-loader', extract.loader, 'css-loader', 'postcss-loader', 'sass-loader']
		},
		{
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts',
					publicPath: '../fonts'
				}
			}]
		}]
	},
	plugins: [
	new clean('./dist', {}),
	new extract({
		filename: '/css/[name].css'
	}),
	new copy([{ 
		from: './assets', to: '' 
	}])]
};