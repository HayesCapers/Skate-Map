// importing needed modules to make the distanceCheck
var haversine = require('./haversine');
var dB = require('./dB');
var query = require('./query');


function distanceCheck(currentPosition,dist = 15){
	//dist defaults to 15 mi.
	return dB(query.locations).then((results)=>{
		//empty array to hold locations in range.
		var array = []
		//map through the returned results to check distance and add them to the array
		results.map((locations)=>{
			//haversine formula uses km so conversion between mi and km.
			var distKM = (dist * 1.60934);
			//init lat and lon of returned query results
			var initLatLon = [locations.latitude,locations.longitude];
			// distance is less than the requested distance
			if(haversine(currentPosition,initLatLon) < distKM){
				//so push it.
				array.push(locations)
			}
		})
		//return our array of values
		return array;
	})
}

module.exports = distanceCheck;