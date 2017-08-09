const path = require('path');

module.exports = {
	title: 'v1.0',
	pages: [
		{
			id: 'readme',
			title: 'Readme File',
			sections: [
				{
					name: 'Read me',
					content: 'docs/One.md',
				},
			],
		},
		{
			id: 'styleguide',
			title: 'Styleguide',
			sections: [
				{
					name: 'Components',
					components: './lib/components/**/[A-Z]*.js',
				},
				{
					name: 'Documentation',
					sections: [
						{
							name: 'Second File',
							content: 'docs/Two.md',
						},
						{
							name: 'First File',
							content: 'docs/One.md',
						},
					],
				},
			],
		},
		{
			id: 'exampleBut',
			title: 'Button',
			components: './lib/components/Button/**/[A-Z]*.js',

		},
		{
			id: 'exampleSwitch',
			title: 'Switch',
			content: './lib/components/Switch/**/[A-Z]*.js',
		},
	],
	updateWebpackConfig(webpackConfig) {
		const dir = path.resolve(__dirname, 'lib');
		webpackConfig.module.loaders.push(
			{
				test: /\.jsx?$/,
				include: dir,
				loader: 'babel',
			},
			{
				test: /\.css$/,
				include: dir,
				loader: 'style!css?modules&importLoaders=1',
			},
			{
				test: /\.json$/,
				include: path.dirname(require.resolve('dog-names/package.json')),
				loader: 'json',
			}
		);
		return webpackConfig;
	},
};
