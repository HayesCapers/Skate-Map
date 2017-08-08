var axios = require('axios')

module.exports = (method,url,dataObj) => {
	return axios({
			method: method,
			url: url,
			data: dataObj
		})
}