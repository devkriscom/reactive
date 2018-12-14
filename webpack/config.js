const webpack = require('webpack')
const path = require('path');
const fs = require('fs');
const copy = require('copy-webpack-plugin');
const extract = require("mini-css-extract-plugin");
const clean = require('clean-webpack-plugin');
var public_path = path.resolve(__dirname, '../public');
var assets_path = path.resolve(__dirname, '../src/static');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	output: {
		path: public_path,
		filename: 'js/[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx']
	},
	context: path.resolve(__dirname, '../'),
	resolve: {
		alias: {
			app: path.resolve(__dirname, '../src/app/'),
			common: path.resolve(__dirname, '../src/common/'),
			components: path.resolve(__dirname, '../src/components/'),
			containers: path.resolve(__dirname, '../src/containers/'),
			domain: path.resolve(__dirname, '../src/domain/'),
			fragments: path.resolve(__dirname, '../src/fragments/'),
			pages: path.resolve(__dirname, '../src/pages/'),
			static: path.resolve(__dirname, '../src/static/'),
			styles: path.resolve(__dirname, '../src/styles/')
		}
	},
	module: {
		rules: [
		{
			test: /\.css$/,
			use:  [  extract.loader, 'css-loader', 'postcss-loader', 'sass-loader']
		},
		{
			test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts',
					publicPath: '../fonts'
				}
			}]
		},
		{
			test: /\.(jpg|png|gif|svg)$/,
			use: [
			{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: '../img/',
				}
			}]
		},
		{ 
			test: /\.(js|jsx)$/, 
			loader: 'babel-loader',
			exclude: /node_modules/,
		}
		]
	},
	plugins: [
	new clean(public_path, {}),
	new extract({
		filename: '/css/[name].css'
	}),
	new copy([{ 
		from: assets_path, to: '' 
	}])
	]
};