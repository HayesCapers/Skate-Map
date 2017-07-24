// exported object of queries in order to cut down size of main index route.

var query = {
	userCheck: 'SELECT * FROM __users WHERE userName = ?',
	login: `UPDATE __users SET token = ?, tokenEXP = DATE_ADD(NOW(), INTERVAL 1 WEEK) WHERE userName = ?`,
	register: 'INSERT INTO __users (userName, email, password, phoneNumber, token, tokenEXP) VALUES (?,?,?,?,?, UNIX_TIMESTAMP(DATE_ADD(NOW(), INTERVAL 1 WEEK)))',
	regUserCheck: 'SELECT * FROM __users WHERE userName = ? OR email = ?',
	account: 'SELECT * FROM __users WHERE token = ?',
	update: '',
	addFave: '',
	addSpotReview: '',
	addSecReview: '',
	distanceCheck: ''
}

module.exports = query;