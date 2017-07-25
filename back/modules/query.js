// exported object of queries in order to cut down size of main index route.

var query = {
	userCheck: 'SELECT * FROM __users WHERE userName = ?',
	login: `UPDATE __users SET token = ?, tokenEXP = DATE_ADD(NOW(), INTERVAL 1 WEEK) WHERE userName = ?`,
	register: 'INSERT INTO __users (userName, email, password, phoneNumber, token, tokenEXP) VALUES (?,?,?,?,?, UNIX_TIMESTAMP(DATE_ADD(NOW(), INTERVAL 1 WEEK)))',
	regUserCheck: 'SELECT * FROM __users WHERE userName = ? OR email = ?',
	account: 'SELECT * FROM __users WHERE token = ?',
	updateNoPass: 'UPDATE __users SET userName = ?, email = ?, phoneNumber = ? WHERE token  = ?',
	updateWithPass: 'UPDATE __users SET userName = ?, email = ?, password = ?, phoneNumber = ? WHERE token  = ?',
	favCheck: 'select * from __spotReviews where userID = ? and locationID = ?',
	addFav: 'insert into __spotReviews (locationID,userID,isFav) values (?,?,?)',
	updateFav: 'update __spotReviews set isFav = ? where userID = ? and locationID = ?',
	reviews: 'select a.locationID,a.locationName,c.userID,c.userName,b.rating,b.review from __spots a inner join __spotReviews b on a.locationID = b.locationID inner join __users c on b.userID = c.userID where a.locationID = ?',
	addSpotReview: 'insert into __spotReviews (locationID,userID,rating,review,isFav) values (?,?,?,?,?);',
	secReviews: 'select a.locationID,a.locationName,c.userID,c.userName,b.secRating,b.secReview from __spots a inner join __securityReviews b on a.locationID = b.locationID inner join __users c on b.userID = c.userID where a.locationID = ?',
	addSecReview: 'insert into __securityReviews (locationID,userID,secRating,secReview) values (?,?,?,?);',
	locations: 'SELECT a.locationID,a.locationName,a.latitude,a.longitude,avg(b.rating) as rating, avg(c.secRating) as secRating FROM __spots a inner join __spotReviews b on a.locationID = b.locationID inner join __securityReviews c on a.locationID = c.locationID group by a.locationID',
	detailed: 'select b.locationName,b.city,b.state,b.description,count(a.rating) as totalRatings, AVG(a.rating) as averageRating from __spotReviews a inner join __spots b on a.locationID = b.locationID where a.locationID = ?'
}

module.exports = query;