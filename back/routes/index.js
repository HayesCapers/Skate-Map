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
	dB(query.userCheck,[userName]).then((results) => {
		if(results.length > 0){
			var checkHash = bcrypt.compareSync(password,results[0].password);
			var token = randToken.uid(40);
			if(checkHash){
				// yay you got your password correct and now you get to login
				dB(query.login,[token,userName]).then((logRes)=>{
					res.json({
						msg: 'Success',
						userName: userName,
						token: token
					})
				})
			}else{
				//well, you tried remembering your password. Not well enough.
				res.json({
					msg: 'invalidPass'
				})
			}
		}else{
			// do you even spell, bruh?
			res.json({
				msg: 'invalidUserName'
			})
		}
	})

});

// registration process
router.post('/register', (req,res)=>{
	var reg = req.body;
	var hash = bcrypt.hashSync(reg.password);
	var token = randToken.uid(40);
	dB(query.regUserCheck,[reg.userName,reg.email]).then((results)=>{
		if(results.length > 0){
			if(results[0].email === reg.email){
				res.json({
					msg: 'emailTaken'
				})
			}else if(results[0].userName === reg.userName){
				res.json({
					msg: 'nameTaken'
				})
			}
		}else{
			dB(query.register,[reg.userName,reg.email,hash,reg.phone,token]).then((regRes)=>{
				res.json({
					msg: 'Success',
					userName: reg.userName,
					token: token
				})
			})
		}
	})
});


// route to bring up account page so they can see their info and potentially edit
router.post('/account', (req,res)=>{
	var acct = req.body;
	var token = req.body.token;
	dB(query.account,[token]).then((results)=>{
		if(results.length > 0){
			var date = Date.now();
			// checking to see if your token has expired
			if((results[0].tokenEXP * 1000) <= date){
				// it has
				res.json({
					msg: 'loginAgain'
				})
			}else{
				// you're in luck. no need to re-login.
				res.json({
					msg: 'accountAccess',
					userName: results[0].userName,
					email: results[0].email,
					phone: results[0].phoneNumber,
					token: token
				})
			}
		}else{
			// apparently you don't know your account? idk. just in case scenario.
			res.json({
				msg: 'register'
			})
		}
	});
});

//update account information route
router.post('/updateAccount', (req,res)=>{
	var acct = req.body;
	var token = req.body.token;
	dB(query.account,[token]).then((results)=>{
		if(results.length > 0){
			var date = Date.now();
			if((results[0].tokenEXP * 1000) <= date){
				res.json({
					msg: 'loginAgain'
				})
			}else{
				// update account with new password
				var checkHash = bcrypt.compareSync(acct.currPass,results[0].password);				
				if((checkHash === true) && (acct.newPass !== '')){
					var hash = bcrypt.hashSync(acct.newPass);
					dB(query.updateWithPass,[acct.userName,acct.email,hash,acct.phone]).then((upAcRes)=>{
						res.json({
							msg: 'accountAccess',
							userName: acct.userName,
							email: acct.email,
							phone: acct.phone,
							token: token
						})
					})
				}else if((checkHash === true) && (acct.newPass === '')){
					//update account without changing passwords
					dB(query.updateNoPass,[acct.userName,acct.email,acct.phone,token]).then((upAcRes)=>{
						res.json({
							msg: 'accountAccess',
							userName: acct.userName,
							email: acct.email,
							phone: acct.phone,
							token: token
						})
					})
				}else if(checkHash === false){
					//you dun messed up your password
					res.json({
						msg: 'invalidPass'
					})
				}
			}
		}else{
			res.json({
				msg: 'register'
			})
		}
	})
});

// populate markers in an area of 15 from current location
router.post('/initMarkers',(req,res)=>{
	var info = [req.body.lat, req.body.lon]
	// promises. so many promises
	var check = new Promise((resolve,reject)=>{
		resolve(distanceCheck(info))
	})
	check.then((results)=>{
		res.json({
			spots: results
		})
	})
})

router.post('/deets',(req,res)=>{
	var info = req.body.locationID;
	dB(query.detailed,[info]).then((deets)=>{
		if(deets.length > 0){
			res.json({
				deets: deets
			})
		}else{
			res.json({
				msg: 'shitBroke'
			})
		}
	})
})

router.post('/reviews', (req,res)=>{
	var info = req.body.locationID;
	dB(query.reviews,[info]).then((results)=>{
		if(results.length > 0){
			res.json({
				reviews: results
			})
		}else{
			res.json({
				reviews: []
			})
		}
	})
})

router.post('/addReview', (req,res)=>{
	var info = req.body;
	var token = req.body.token;
	dB(query.account,[token]).then((results)=>{
		if(results.length > 0){
			var date = Date.now();
			if((results[0].tokenEXP * 1000) <= date){
				res.json({
					msg: 'loginAgain'
				})
			}else{	
				dB(query.userCheck,[info.userName]).then((user)=>{
					if(user.length === 0){
						res.json({
							msg: 'shitBroke'
						})
					}else{
						var userID = user[0].userID;
						var spotArr = [
							info.locationID,
							userID,
							info.rating,
							info.review,
							info.isFav
						]
						dB(query.addSpotReview,spotArr).then(()=>{
							res.json({
								msg: 'reviewAdded'
							})
						})
					}
				})
			}
		}else{
			res.json({
				msg: 'register'
			})
		}
	})
})

router.post('/security', (req,res)=>{
	var info = req.body.locationID;
	dB(query.secReviews,[info]).then((results)=>{
		if(results.length > 0){
			res.json({
				secReviews: results
			})
		}else{
			res.json({
				secReviews: []
			})
		}
	})
})

router.post('/addSecReview', (req,res)=>{
	var info = req.body;
	var token = req.body.token;
	dB(query.account,[token]).then((results)=>{
		if(results.length > 0){
			var date = Date.now();
			if((results[0].tokenEXP * 1000) <= date){
				res.json({
					msg: 'loginAgain'
				})
			}else{	
				dB(query.userCheck,[info.userName]).then((user)=>{
					if(user.length === 0){
						res.json({
							msg: 'shitBroke'
						})
					}else{
						var userID = user[0].userID;
						var spotArr = [
							info.locationID,
							userID,
							info.rating,
							info.review,
							info.isFav
						]
						dB(query.addSecReview,spotArr).then(()=>{
							res.json({
								msg: 'secReviewAdded'
							})
						})
					}
				})
			}
		}else{
			res.json({
				msg: 'register'
			})
		}
	})
})

router.post('/addFav',(req,res)=>{
	var info = req.body;
	var token = req.body.token;
	dB(query.account,[token]).then((results)=>{
		if(results.length > 0){
			var date = Date.now();
			if((results[0].tokenEXP * 1000) <= date){
				res.json({
					msg: 'loginAgain'
				})
			}else{
				var userID = results[0].userID;
				dB(query.favCheck,[userID,info.locationID]).then((favs)=>{
					if(favs.length !== 0){
						dB(query.updateFav,[info.isFav,userID,info.locationID]).then(()=>{
							res.json({
								msg: 'favChange'
							})
						})
					}else if(favs.length === 0){
						dB(query.addFav,[info.locationID,userID,info.isFav]).then(()=>{
							res.json({
								msg: 'favAdded'
							})
						})
					}
				})
			}
		}else{
			res.json({
				msg: 'register'
			})
		}
	})
})

router.post('/profile',(req,res)=>{
	var userName = req.body.userName;
	dB(userCheck,[userName]).then((deets)=>{
		if(deets.length > 0){
			res.json({
				deets: deets
			})
		}else{
			res.json({
				msg: 'shitBroke'
			})
		}
	})
})

router.post('/userDist',(req,res)=>{
	var info = [req.body.lat, req.body.lon];
	var dist = req.body.dist;
	// promises. so many promises
	var check = new Promise((resolve,reject)=>{
		resolve(distanceCheck(info,dist))
	})
	check.then((results)=>{
		res.json({
			spots: results
		})
	})
})




module.exports = router;
