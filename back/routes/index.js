// import all the things
const { router, query, dB, randToken, bcrypt, distanceCheck } = require('../modules');


// useless but i'll keep it anyway.
router.get('/', function(req, res, next) {
  res.json({
	msg: 'hayes, you monster'
  });
});

// login process
router.post('/login',(req,res)=>{
	var userName = req.body.userName;
	var password = req.body.password;
	dB(query.userCheck,[userName]).then((deets) => {
		if(deets.length > 0){
			var checkHash = bcrypt.compareSync(password,deets[0].password);
			var token = randToken.uid(40);
			if(checkHash){
				// yay you got your password correct and now you get to login
				dB(query.login,[token,userName]).then((logDeets)=>{
					res.json({
						msg: 'Success',
						userName: userName,
						token: token
					});
				});
			}else{
				//well, you tried remembering your password. Not well enough.
				res.json({
					msg: 'invalidPass'
				});
			}
		}else{
			// do you even spell, bruh?
			res.json({
				msg: 'invalidUserName'
			});
		}
	});

});

// registration process
router.post('/register', (req,res)=>{
	var reg = req.body;
	var hash = bcrypt.hashSync(reg.password);
	var token = randToken.uid(40);
	dB(query.regUserCheck,[reg.userName,reg.email]).then((deets)=>{
		if(deets.length > 0){
			if(deets[0].email === reg.email){
				res.json({
					msg: 'emailTaken'
				});
			}else if(deets[0].userName === reg.userName){
				res.json({
					msg: 'nameTaken'
				});
			}
		}else{
			dB(query.register,[reg.userName,reg.email,hash,reg.phone,token]).then((regDeets)=>{
				res.json({
					msg: 'Success',
					userName: reg.userName,
					token: token
				});
			});
		}
	});
});


// route to bring up account page so they can see their info and potentially edit
router.post('/account', (req,res)=>{
	var acct = req.body;
	var token = req.body.token;
	dB(query.account,[token]).then((deets)=>{
		if(deets.length > 0){
			var date = Date.now();
			// checking to see if your token has expired
			if((deets[0].tokenEXP * 1000) <= date){
				// it has
				res.json({
					msg: 'loginAgain'
				});
			}else{
				// you're in luck. no need to re-login.
				res.json({
					msg: 'accountAccess',
					userName: deets[0].userName,
					email: deets[0].email,
					phone: deets[0].phoneNumber,
					token: token
				});
			}
		}else{
			// apparently you don't know your account? idk. just in case scenario.
			res.json({
				msg: 'register'
			});
		}
	});
});

//update account information route
router.post('/updateAccount', (req,res)=>{
	var acct = req.body;
	var token = req.body.token;
	//obligatory tokenEXP check
	dB(query.account,[token]).then((deets)=>{
		if(deets.length > 0){
			var date = Date.now();
			if((deets[0].tokenEXP * 1000) <= date){
				res.json({
					msg: 'loginAgain'
				});
			}else{
				// update account with new password
				var checkHash = bcrypt.compareSync(acct.currPass,deets[0].password);				
				if((checkHash === true) && (acct.newPass !== '')){
					var hash = bcrypt.hashSync(acct.newPass);
					dB(query.updateWithPass,[acct.userName,acct.email,hash,acct.phone]).then((upAcRes)=>{
						res.json({
							msg: 'accountAccess',
							userName: acct.userName,
							email: acct.email,
							phone: acct.phone,
							token: token
						});
					});
				}else if((checkHash === true) && (acct.newPass === '')){
					//update account without changing passwords
					dB(query.updateNoPass,[acct.userName,acct.email,acct.phone,token]).then((upAcRes)=>{
						res.json({
							msg: 'accountAccess',
							userName: acct.userName,
							email: acct.email,
							phone: acct.phone,
							token: token
						});
					});
				}else if(checkHash === false){
					//you dun messed up your password
					res.json({
						msg: 'invalidPass'
					});
				}
			}
		}else{
			//your ass needs to register
			res.json({
				msg: 'register'
			});
		}
	});
});

// populate markers in an area of 15 from current location
router.post('/initMarkers',(req,res)=>{
	var info = [req.body.lat, req.body.lon]
	// promises. so many promises
	var check = new Promise((resolve,reject)=>{
		resolve(distanceCheck(info))
	});
	check.then((deets)=>{
		res.json({
			spots: deets
		});
	});
});

//gotta get the deets bruh
router.post('/deets',(req,res)=>{
	var info = req.body.locationID;
	dB(query.detailed,[info]).then((deets)=>{
		if(deets.length > 0){
			//givin ya the deets bruh
			res.json({
				deets: deets
			});
		}else{
			res.json({
				msg: 'shitBroke'
			});
		}
	});
});

router.get('/img/:id',(req,res)=>{
   	var id = req.params.id;
	dB(query.img,[id]).then((deets)=>{
	   	res.end(deets[0].img, 'binary')
	})	
   
})



//review page
router.post('/reviews', (req,res)=>{
	var info = req.body.locationID;
	dB(query.reviews,[info]).then((deets)=>{
		if(deets.length > 0){
			//for deets if they exist
			res.json({
				reviews: deets
			});
		}else{
			//because some might not have any
			res.json({
				reviews: []
			});
		}
	});
});

router.post('/addReview', (req,res)=>{
	var info = req.body;
	var token = req.body.token;
	// token checks for all
	dB(query.account,[token]).then((deets)=>{
		if(deets.length > 0){
			var date = Date.now();
			if((deets[0].tokenEXP * 1000) <= date){
				//expired. login, yo.
				res.json({
					msg: 'loginAgain'
				});
			}else{
				//not expired, yay.
				dB(query.userCheck,[info.userName]).then((user)=>{
					if(user.length === 0){
						//just in case... i guess?
						res.json({
							msg: 'shitBroke'
						});
					}else{
						//lets add that review. 
						//gotta get everything in order first.
						var userID = user[0].userID;
						var spotArr = [
							info.locationID,
							userID,
							info.rating,
							info.review,
							info.isFav
						]
						//sending all the deets to get back a message updating you that its added
						dB(query.addSpotReview,spotArr).then(()=>{
							res.json({
								msg: 'reviewAdded'
							});
						});
					}
				});
			}
		}else{
			//srsly. register.
			res.json({
				msg: 'register'
			});
		}
	});
});

//basic security levels page.
router.post('/security', (req,res)=>{
	var info = req.body.locationID;
	//dem deets tho
	dB(query.secReviews,[info]).then((deets)=>{
		if(deets.length > 0){
			res.json({
				secReviews: deets
			});
		}else{
			res.json({
				secReviews: []
			});
		}
	});
});

//add security info for spots
router.post('/addSecReview', (req,res)=>{
	var info = req.body;
	var token = req.body.token;
	//yay. obligations.
	dB(query.account,[token]).then((deets)=>{
		if(deets.length > 0){
			var date = Date.now();
			if((deets[0].tokenEXP * 1000) <= date){
				res.json({
					msg: 'loginAgain'
				});
			}else{	
				dB(query.userCheck,[info.userName]).then((user)=>{
					//hope this never gets seen.
					if(user.length === 0){
						res.json({
							msg: 'shitBroke'
						});
					}else{
						var userID = user[0].userID;
						var spotArr = [
							info.locationID,
							userID,
							info.rating,
							info.review,
						]
						dB(query.addSecReview,spotArr).then(()=>{
							// boom. added.
							res.json({
								msg: 'secReviewAdded'
							});
						});
					}
				});
			}
		}else{
			//oh come on.
			res.json({
				msg: 'register'
			});
		}
	});
});

// adding to favorites.
router.post('/addFav',(req,res)=>{
	var info = req.body;
	var token = req.body.token;
	// and another one.
	dB(query.account,[token]).then((deets)=>{
		if(deets.length > 0){
			var date = Date.now();
			if((deets[0].tokenEXP * 1000) <= date){
				res.json({
					msg: 'loginAgain'
				});
			}else{
				var userID = deets[0].userID;
				//checking to see if you have favs in there for that spot.
				dB(query.favCheck,[userID,info.locationID]).then((favs)=>{
					if(favs.length !== 0){
						// you do. lets update it.
						dB(query.updateFav,[info.isFav,userID,info.locationID]).then(()=>{
							res.json({
								msg: 'favChange'
							});
						});
					}else if(favs.length === 0){
						//you don't. let's add it.
						dB(query.addFav,[info.locationID,userID,info.isFav]).then(()=>{
							res.json({
								msg: 'favAdded'
							});
						});
					}
				});
			}
		}else{
			//don't do this to me.
			res.json({
				msg: 'register'
			});
		}
	});
});

//generic user profile pages
router.post('/profile',(req,res)=>{
	var userName = req.body.userName;
	//all the deets.
	dB(userCheck,[userName]).then((deets)=>{
		if(deets.length > 0){
			res.json({
				deets: deets
			});
		}else{
			res.json({
				msg: 'shitBroke'
			});
		}
	});
});

//finding what is closest to user based on miles they put in
router.post('/userDist',(req,res)=>{
	var info = [req.body.lat, req.body.lon];
	var dist = req.body.dist;
	// promises in promises in promises in pro...
	var check = new Promise((resolve,reject)=>{
		resolve(distanceCheck(info,dist))
	});
	check.then((deet)=>{
		res.json({
			spots: deets
		});
	});
});



// work it.
module.exports = router;
