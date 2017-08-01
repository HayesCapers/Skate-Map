import { RNS3 } from 'react-native-aws3';
const { s3Key, s3Secret } = require('../config/config');


module.exports = (path, name) => {
	const file = {
		uri: path,
		name: `${name}.jpg`,
		type: 'image/jpg'
	}

	const options = {
		keyPrefix: "images/",
		bucket: "s3-skatespot",
		region: "us-east-1",
		accessKey: s3Key,
		secretKey: s3Secret,
		successActionStatus: 201
	}

	 return RNS3.put(file, options)
}	