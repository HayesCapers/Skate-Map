// exported object of queries in order to cut down size of main index route.

var query = {
	//basic db check to see if the user exists and pulls their info
	userCheck: 'SELECT * FROM __users WHERE userName = ?',
	//query to add information to the profile pages of any user
	profile: 'select userName,city,state,deets,phoneNumber,email from __users where userName = ?',
	//every login will update the user token and give a new tokenEXP date
	login: `UPDATE __users SET token = ?, tokenEXP = DATE_ADD(NOW(), INTERVAL 1 WEEK) WHERE userName = ?`,
	//adding the new user into the database, creating a token and adding a 1 week exp date in seconds
	register: 'INSERT INTO __users (userName, email, password, phoneNumber, token, tokenEXP) VALUES (?,?,?,?,?, UNIX_TIMESTAMP(DATE_ADD(NOW(), INTERVAL 1 WEEK)))',
	//query to see if the username or the email is already in the system. if so, tell them be more creative and add x's or numbers to their names
	regUserCheck: 'SELECT * FROM __users WHERE userName = ? OR email = ?',
	//easy account check by token
	account: 'SELECT * FROM __users WHERE token = ?',
	//account update if they aren't adding a new password
	updateNoPass: 'UPDATE __users SET userName = ?, email = ?, phoneNumber = ? WHERE token  = ?',
	//account update if they are updating to a new password
	updateWithPass: 'UPDATE __users SET userName = ?, email = ?, password = ?, phoneNumber = ? WHERE token  = ?',
	//checking to see if they have a favorite for that location in the system
	favCheck: 'select * from __spotReviews where userID = ? and locationID = ?',
	//adding the favorite into the spotReview db
	addFav: 'insert into __spotReviews (locationID,userID,isFav) values (?,?,?)',
	//if they already have one, then here. update it.
	updateFav: 'update __spotReviews set isFav = ? where userID = ? and locationID = ?',
	//collecting all the reviews for a specific location
	reviews: 'select a.locationID,a.locationName,c.userID,c.userName,b.rating,b.review from __spots a inner join __spotReviews b on a.locationID = b.locationID inner join __users c on b.userID = c.userID where a.locationID = ?',
	addSpotReview: 'insert into __spotReviews (locationID,userID,rating,review,isFav) values (?,?,?,?,?);',
	secReviews: 'select a.locationID,a.locationName,c.userID,c.userName,b.secRating,b.secReview from __spots a inner join __securityReviews b on a.locationID = b.locationID inner join __users c on b.userID = c.userID where a.locationID = ?',
	addSecReview: 'insert into __securityReviews (locationID,userID,secRating,secReview) values (?,?,?,?);',
	locations: 'SELECT a.locationID,a.locationName,a.latitude,a.longitude,avg(b.rating) as rating, avg(c.secRating) as secRating FROM __spots a inner join __spotReviews b on a.locationID = b.locationID inner join __securityReviews c on a.locationID = c.locationID group by a.locationID',
	detailed: 'select b.locationName,b.city,b.state,b.description,b.img,count(a.rating) as totalRatings, AVG(a.rating) as averageRating from __spotReviews a inner join __spots b on a.locationID = b.locationID where a.locationID = ?'
}

module.exports = query;