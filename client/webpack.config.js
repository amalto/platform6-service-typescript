const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const sourceDirectory = './src/'
// Add a Webpack entry for all JSON and TypeScript files in the folder `sourceDirectory`
const entries = fs
	.readdirSync(sourceDirectory)
	.filter(file => file.match(/\.json$/))
	// Removing the extension
	.map(filename => filename.split('.').slice(0, -1).join('.'))
	.reduce((entries, filename) => {
		entries[filename] = `${sourceDirectory}${filename}.tsx`

		return entries
	}, {})

module.exports = {
	entry: entries,
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
