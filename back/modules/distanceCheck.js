// importing needed modules to make the distanceCheck
// var back = require('./index');
var haversine = require('./haversine');
var dB = require('./dB');
var query = require('./query');


function distanceCheck(currentPosition){
	// console.log('im fuckin here!')
	// console.log(query)
	return dB(query.locations).then((results)=>{
		var array = []
		// console.log(results)
		results.map((locations)=>{
			var distKM = 24.1401;
			var initLatLon = [locations.latitude,locations.longitude];
			if(haversine(currentPosition,initLatLon) > distKM){
				
			}else{
				array.push(locations)
			}
		})
		// console.log(array)
		return array;
	})
}

module.exports = distanceCheck;