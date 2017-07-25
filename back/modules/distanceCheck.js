// importing needed modules to make the distanceCheck
var haversine = require('./haversine');
var dB = require('./dB');
var query = require('./query');


function distanceCheck(currentPosition,dist = 15){
	return dB(query.locations).then((results)=>{
		var array = []
		results.map((locations)=>{
			var distKM = (dist * 1.60934);
			var initLatLon = [locations.latitude,locations.longitude];
			if(haversine(currentPosition,initLatLon) < distKM){
				array.push(locations)
			}
		})
		return array;
	})
}

module.exports = distanceCheck;