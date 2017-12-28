const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

module.exports = {
	entry: {
		ServiceConfiguration: path.resolve(__dirname, './src/ServiceConfiguration.tsx')
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './build')
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
	externals: {
		'jquery': 'jQuery',
		'react': 'React',
		'react-dom': 'ReactDOM',
		'@amalto/platform6-ui': 'b2portal'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'babel-loader!ts-loader'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	node: { fs: 'empty'},
	plugins: [
		new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': 'production' } })
	]
};
