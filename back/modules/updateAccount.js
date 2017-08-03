// import the necessary modules
var bcrypt = require('bcrypt-nodejs');

function updateAccount(acct,info){
	var password = info.password;
	var token = info.token;
	var checkHash = bcrypt.compareSync(password,acct.password);
	var array = [];

	var userName = function(){
		if((info.userName !== undefined) || (info.userName !== null) || (info.userName !== '')){
			return info.userName;
		}else if((acct.userName !== undefined) || (acct.userName !== null) || (acct.userName !== '')){
			return acct.userName;
		}else{
			return null;
		}
	}

	var email = function(){
		if((info.email !== undefined) || (info.email !== null) || (info.email !== '')){
			return info.email;
		}else if((acct.email !== undefined) || (acct.email !== null) || (acct.email !== '')){
			return acct.email;
		}else{
			return null;
		}
	}

	var phoneNumber = function(){
		if((info.phoneNumber !== undefined) || (info.phoneNumber !== null) || (info.phoneNumber !== '')){
			return info.phoneNumber;
		}else if((acct.phoneNumber !== undefined) || (acct.phoneNumber !== null) || (acct.phoneNumber !== '')){
			return acct.phoneNumber;
		}else{
			return null;
		}
	}

	var firstName = function(){
		if((info.firstName !== undefined) || (info.firstName !== null) || (info.firstName !== '')){
			return info.firstName;
		}else if((acct.firstName !== undefined) || (acct.firstName !== null) || (acct.firstName !== '')){
			return acct.firstName;
		}else{
			return null;
		}
	}

	var lastName = function(){
		if((info.lastName !== undefined) || (info.lastName !== null) || (info.lastName !== '')){
			return info.lastName;
		}else if((acct.lastName !== undefined) || (acct.lastName !== null) || (acct.lastName !== '')){
			return acct.lastName;
		}else{
			return null;
		}
	}

	var bio = function(){
		if((info.bio !== undefined) || (info.bio !== null) || (info.bio !== '')){
			return info.bio;
		}else if((acct.bio !== undefined) || (acct.bio !== null) || (acct.bio !== '')){
			return acct.bio;
		}else{
			return null;
		}
	}

	if(checkHash === true){
		array = [
			userName(),
			email(),
			phoneNumber(),
			firstName(),
			lastName(),
			bio(),
			token
		]

		return array;

	}else{
		var hash = bcrypt.hashSync(password);
		array = [
			userName(),
			email(),
			hash,
			phoneNumber(),
			firstName(),
			lastName(),
			bio(),
			token
		]

		return array;

	}

}

module.exports = updateAccount;