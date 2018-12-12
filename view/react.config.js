const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


var entries = {
	main: './script/app.js'
};
var modules = [];
["profile","auth","store","order","photo","post","event","video","hotel","service","product"].forEach(function(item) {
	if (fs.existsSync('views/module/'+ item + '/source/scss/app.scss')) {
		modules.push('./views/module/'+ item + '/source/scss/app.scss');
	}
	if (fs.existsSync('views/module/'+ item + '/source/script/app.js')) {
		modules.push('./views/module/'+ item + '/source/script/app.js');
	}
});
if(modules.length > 1) {
	entries.module = modules;
}

var widgets = [];
["nav", "dropdown"].forEach(function(item) {
	if (fs.existsSync('views/widget/'+ item + '/source/scss/app.scss')) {
		widgets.push('./views/widget/'+ item + '/source/scss/app.scss');
	}
	if (fs.existsSync('views/widget/'+ item + '/source/script/app.js')) {
		widgets.push('./views/widget/'+ item + '/source/script/app.js');
	}
});
if(widgets.length > 1) {
	entries.widget = widgets;
}

var designs = [];
["admin","publish","member","network"].forEach(function(item) {
	if (fs.existsSync('views/design/'+ item + '/source/scss/app.scss')) {
		designs.push('./views/design/'+ item + '/source/scss/app.scss');
	}
	if (fs.existsSync('views/design/'+ item + '/source/script/app.js')) {
		designs.push('./views/design/'+ item + '/source/script/app.js');
	}
});
if(designs.length > 1) {
	entries.design = designs;
}

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: entries,
	output: {
		path: path.resolve(__dirname, '../web/assets'),
		filename: 'js/[name].js'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
	new CleanWebpackPlugin('../web/assets', {}),
	new MiniCssExtractPlugin({
		filename: '/css/[name].css'
	}),
	new CopyWebpackPlugin([{ 
		from: './assets', to: '' 
	}])]
};