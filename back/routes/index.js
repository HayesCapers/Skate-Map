// import all the things
var back = require('../modules');
var router = back.router;
var query = back.query;
var dB = back.dB;
var randToken = back.randToken;
var bcrypt = back.bcrypt;


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
				dB(query.login,[token,userName]).then((logRes)=>{
					res.json({
						msg: 'Success',
						userName: userName,
						token: token
					})
				})
			}else{
				res.json({
					msg: 'invalidPass'
				})
			}
		}else{
			res.json({
				msg: 'invalidUserName'
			})
		}
	})
	// connection.query(query,[userName],(error,results)=>{
	// 	if(results.length > 0){
	// 		if(error){
	// 			res.json({
	// 				msg: error
	// 			})
	// 		}else{
	// 			var checkHash = bcrypt.compareSync(req.body.password,results[0].password);
	// 			if (checkHash){
	// 				const updateToken = `UPDATE __users SET token = ?, tokenEXP = DATE_ADD(NOW(), INTERVAL 1 WEEK) WHERE userName = ?`
	// 				var token = randToken.uid(40);
	// 				connection.query(updateToken, [token,userName], (upERR, upRES)=>{
	// 					if(upERR){
	// 						res.json({
	// 							msg: upERR
	// 						})
	// 					}else{
	// 						console.log(upRES)
	// 						res.json({
	// 							msg: 'Success',
	// 							userName: userName,
	// 							token: token
	// 						})
	// 					}
	// 				})
	// 			}else{
	// 				res.json({
	// 					msg: 'passInvalid'
	// 				})
	// 			}
	// 		}
	// 	}else{
	// 		res.json({
	// 			msg: 'youDunGoofed'
	// 		})
	// 	}
	// })
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
	// connection.query(userCheck,[reg.userName,reg.email], (checkERR, checkRES)=>{
	// 	if(checkERR){
	// 		res.json({
	// 			msg: checkERR
	// 		})
	// 	}else{
	// 		if(checkRES.length > 0){
	// 			if(checkRES[0].email === reg.email){
	// 				res.json({
	// 					msg: 'emailTaken'
	// 				})
	// 			}else if(checkRES[0].userName === reg.userName){
	// 				res.json({
	// 					msg: 'nameTaken'
	// 				})
	// 			}
	// 		}else{
	// 			connection.query(registration,[reg.userName,reg.email,hash,reg.phone,token],(regERR,regRES)=>{
	// 				if(regERR){
	// 					res.json({
	// 						msg: regERR
	// 					})
	// 				}else{
	// 					res.json({
	// 						msg: 'Success',
	// 						userName: reg.userName,
	// 						token: token
	// 					})
	// 				}
	// 			})
	// 		}
	// 	}	
});


// route to bring up account page so they can see their info and potentially edit
router.post('/account', (req,res)=>{
	var acct = req.body;
	var token = req.body.token;
	dB(query.account,[token]).then((results)=>{
		if(results.length > 0){
			var date = Date.now();
			if(results[0].tokenEXP <= date){
				res.json({
					msg: 'loginAgain'
				})
			}else{
				res.json({
					userName: results[0].userName,
					email: results[0].email,
					phone: results[0].phoneNumber
				})
			}
		}else{
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
		
	})
})



module.exports = router;
