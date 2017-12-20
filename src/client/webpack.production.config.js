const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

// Fetch all JSON and TypeScript files in the folder `typescript`
const entries = fs
	.readdirSync('./core/')
	.filter(file => file.match(/.*\.json$/))
	.map(fileName => fileName.replace('.json', ''))
	.reduce((acc, fileName) => {
		acc[fileName] = './core/' + fileName + '.tsx'
		return acc
	}, {})

module.exports = {
	entry: entries,
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './bundle')
	},
	resolve: {
		extensions: ['.tsx', '.js', '.json']
	},
	externals: {
		'jquery': 'jQuery',
		'pikaday': 'Pikaday',
		'moment': 'moment',
		'react': 'React',
		'react-dom': 'ReactDOM',
		'platform6-ui': 'b2portal'
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
		new webpack.DefinePlugin({ 'process.env': {'NODE_ENV': 'production'} })
	]
};
