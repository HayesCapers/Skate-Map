// exported object of queries in order to cut down size of main index route.

var query = {
	//basic db check to see if the user exists and pulls their info
	userCheck: 'SELECT * FROM __users WHERE userName = ?',
	//query to add information to the profile pages of any user
	profile: 'select a.userName,a.email,a.phoneNumber,a.bio,avg(b.skillRating) as skillRating,count(b.skillRating) as totalReviews from __users a left join __skillReviews b on a.userID = b.userID where a.userName = ? group by a.userID',
	//every login will update the user token and give a new tokenEXP date
	login: `UPDATE __users SET token = ?, tokenEXP = UNIX_TIMESTAMP(DATE_ADD(NOW(), INTERVAL 1 WEEK)) WHERE userName = ?`,
	//adding the new user into the database, creating a token and adding a 1 week exp date in seconds
	register: 'INSERT INTO __users (userName, email, password, phoneNumber, token, tokenEXP) VALUES (?,?,?,?,?, UNIX_TIMESTAMP(DATE_ADD(NOW(), INTERVAL 1 WEEK)))',
	//query to see if the username or the email is already in the system. if so, tell them be more creative and add x's or numbers to their names
	regUserCheck: 'SELECT * FROM __users WHERE userName = ? OR email = ?',
	//easy account check by token
	account: 'SELECT * FROM __users WHERE token = ?',
	//account update if they aren't adding a new password
	updateNoPass: 'UPDATE __users SET userName = ?, email = ?, phoneNumber = ?, firstName = ?, lastName = ?, bio = ? WHERE token  = ?',
	//account update if they are updating to a new password
	updateWithPass: 'UPDATE __users SET userName = ?, email = ?, password = ?, phoneNumber = ?, firstName = ?, lastName = ?, bio = ? WHERE token  = ?',
	//checking to see if they have a favorite for that location in the system
	favCheck: 'select * from __spotReviews where userID = ? and locationID = ?',
	//adding the favorite into the spotReview db
	addFav: 'insert into __spotReviews (locationID,userID,isFav) values (?,?,?)',
	//if they already have one, then here. update it.
	updateFav: 'update __spotReviews set isFav = ? where userID = ? and locationID = ?',
	//collecting all the reviews for a specific location
	reviews: 'select a.locationID,a.locationName,c.userID,c.userName,b.rating,b.review from __spots a inner join __spotReviews b on a.locationID = b.locationID inner join __users c on b.userID = c.userID where a.locationID = ?',
	//addes the new review to the db
	addSpotReview: 'insert into __spotReviews (locationID,userID,rating,review,isFav) values (?,?,?,?,?);',
	//collects all the secReviews for that location
	secReviews: 'select a.locationID,a.locationName,c.userID,c.userName,b.secRating,b.secReview from __spots a inner join __securityReviews b on a.locationID = b.locationID inner join __users c on b.userID = c.userID where a.locationID = ?',
	//adds a new secReview
	addSecReview: 'insert into __securityReviews (locationID,userID,secRating,secReview) values (?,?,?,?);',
	//inital markers query to get all locations
	locations: 'select a.locationID,a.locationName,a.latitude,a.longitude,avg(b.rating) as rating,avg(c.secRating) as secRating from __spots a left join __spotReviews b on a.locationID = b.locationID left join __securityReviews c on a.locationID = c.locationID GROUP by a.locationID',
	//query for averages for locations by ID
	avgs: 'select avg(a.rating) as rating, avg(b.secRating) as secRating from __spotReviews a inner join __securityReviews b on a.locationID = b.locationID where a.locationID = ?',
	//detailed query to get all relevant info for individual spots
	detailed: 'select b.locationName,b.city,b.state,b.description,b.img,count(a.rating) as totalRatings, AVG(a.rating) as averageRating,count(c.secRating) as totalSecRatings, avg(secRating) as avgSecRatings from __spotReviews a inner join __spots b on a.locationID = b.locationID inner join __securityReviews c on a.locationID = c.locationID where a.locationID = ?',
	//insert query for new spot to be made
	addSpot: 'insert into __spots (locationName,city,state,longitude,latitude,description,img) values (?,?,?,?,?,?,?)',
	//quick query for just locationID
	locID: 'select locationID from __spots where latitude = ? and longitude = ?',
	//add a review for another user
	addSkillReview: 'insert into __skillReviews (userID,reviewerID,skillRating,skillReview) values (?,?,?,?)',
	//query for skill reviews for a user
	skillReviews: 'select b.userName,a.skillRating, a.skillReview from __skillReviews a inner join __users b on a.reviewerID = b.userID where a.userID = ?',
	//friends list
	friends: 'select a.friendID1,b.userName as friend1,a.friendID2,c.userName as friend2,a.friendID3,d.userName as friend3,a.friendID4,e.userName as friend4,a.friendID5,f.userName as friend5 from __friends a left join __users b on a.friendID1 = b.userID left join __users c on a.friendID2 = c.userID left join __users d on a.friendID3 = d.userID left join __users e on a.friendID4 = e.userID left join __users f on a.friendID5 = f.userID where a.userID = ?',
	//add your first friend
	addFriend: 'insert into __friends (userID,friendID1) values (?,?)',
	//update your friends list
	addFriend1: 'update __friends set friendID1 = ? where userID = ?',
	addFriend2: 'update __friends set friendID2 = ? where userID = ?',
	addFriend3: 'update __friends set friendID3 = ? where userID = ?',
	addFriend4: 'update __friends set friendID4 = ? where userID = ?',
	addFriend5: 'update __friends set friendID5 = ? where userID = ?',
	//removing friend queries
	removeFriend1: 'update __friends set friendID1 = null where userID = ?',
	removeFriend2: 'update __friends set friendID2 = null where userID = ?',
	removeFriend3: 'update __friends set friendID3 = null where userID = ?',
	removeFriend4: 'update __friends set friendID4 = null where userID = ?',
	removeFriend5: 'update __friends set friendID5 = null where userID = ?'	
}

module.exports = query;