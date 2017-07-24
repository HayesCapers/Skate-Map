// exported object of queries in order to cut down size of main index route.

var query = {
	userCheck: 'SELECT * FROM __users WHERE userName = ?',
	login: `UPDATE __users SET token = ?, tokenEXP = DATE_ADD(NOW(), INTERVAL 1 WEEK) WHERE userName = ?`,
	register: 'INSERT INTO __users (userName, email, password, phoneNumber, token, tokenEXP) VALUES (?,?,?,?,?, UNIX_TIMESTAMP(DATE_ADD(NOW(), INTERVAL 1 WEEK)))',
	regUserCheck: 'SELECT * FROM __users WHERE userName = ? OR email = ?',
	account: 'SELECT * FROM __users WHERE token = ?',
	updateNoPass: 'UPDATE __users SET userName = ?, email = ?, phoneNumber = ? WHERE token  = ?',
	updateWithPass: 'UPDATE __users SET userName = ?, email = ?, password = ?, phoneNumber = ? WHERE token  = ?',
	addFave: '',
	addSpotReview: '',
	addSecReview: '',
	locations: 'SELECT locationID,locationName,rating,securityLevel,latitude,longitude FROM __spots'
}

module.exports = query;