// import all the things
var back = require('../modules');
var router = back.router;
var query = back.query;
var dB = back.dB;
var randToken = back.randToken;
var bcrypt = back.bcrypt;
var distanceCheck = back.distanceCheck;


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
		}
	})
});

router.post('/initMarkers',(req,res)=>{
	var info = req.body;
	var check = distanceCheck([info.lat,info.lon]);
	res.json({
		spots: check
	})
})



module.exports = router;
