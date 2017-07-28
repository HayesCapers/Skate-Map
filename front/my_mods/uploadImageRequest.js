import { RNS3 } from 'react-native-aws3';


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
		accessKey: "AKIAIKYBFCBIKMB4SLYA",
		secretKey: "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",
		successActionStatus: 201
	}

	 return RNS3.put(file, options)
}	