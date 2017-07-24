var axios = require('axios')

module.exports = (method,url,dataObj) => {
	return axios({
		method,
		url,
		data: dataObj
	})
}