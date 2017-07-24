// importing needed modules to make the distanceCheck
var back = require('../modules');
var haversine = back.haversineForm;
var dB = back.dB;
var query = back.query;


function distanceCheck(currentPosition){
	dB(query.locations).then((results)=>{
		var array = []
		results.map((locations)=>{
			var distKM = 24.1401;
			var initLatLon = [locations.latitude,locations.longitude];
			if(haversine(currentPosition,initLatLon) > distKM){
				continue
			}else{
				array.push(locations)
			}
		})
		return array;
	})
}

module.exports = distanceCheck;