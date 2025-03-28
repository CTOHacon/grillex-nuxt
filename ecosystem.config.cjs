module.exports = {
	apps: [
		{
			name: 'grillex-frontend',
			port: 3002,
			exec_mode: 'cluster',
			instances: 'max',
			script: './.output/server/index.mjs'
		}
	]
};
