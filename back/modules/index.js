// modules to be exported to index.js route file.
// gives access to all necessary processes in order to cut down length of file.

module.exports = {
	bcrypt: require('bcrypt-nodejs'),
	randToken: require('rand-token'),
	dB: require('./dB'),
	router: require('./router'),
	query: require('./query'),
	haversineForm: require('./haversine'),
	distanceCheck: require('./distanceCheck'),
	updateAccount: require('./updateAccount')
};