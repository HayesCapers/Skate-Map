// importing needed modules to make the distanceCheck
var haversine = require('./haversine');
var dB = require('./dB');
var query = require('./query');


function distanceCheck(currentPosition){
	return dB(query.locations).then((results)=>{
		var array = []
		results.map((locations)=>{
			var distKM = 24.1401;
			var initLatLon = [locations.latitude,locations.longitude];
			if(haversine(currentPosition,initLatLon) < distKM){
				array.push(locations)
			}
		})
		return array;
	})
}

module.exports = distanceCheck;