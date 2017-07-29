// importing needed modules to make the distanceCheck
var haversine = require('./haversine');
var dB = require('./dB');
var query = require('./query');


function distanceCheck(currentPosition,dist = 15){
	//dist defaults to 15 mi.
	return dB(query.locations).then((results)=>{
		// console.log(results)

		return new Promise((resolve,reject) => {
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
					//time to grab the reviews
					dB(query.avgs,locations.locationID).then((avgs)=>{
						var loc = {};
						if(avgs.length === 0){
							loc = {
								locationName: locations.locationName,
								locationID: locations.locationID,
								latitude: locations.latitude,
								longitude: locations.longitude,
								rating: 0,
								secRating: 0
							}
							array.push(loc)
						}else{
							loc = {
								locationName: locations.locationName,
								locationID: locations.locationID,
								latitude: locations.latitude,
								longitude: locations.longitude,
								rating: avgs.rating,
								secRating: avgs.secRating
							}
						}
						// console.log(loc)
						//so push loc
						array.push(loc)
					})
				}
			})
			resolve(array)
		}).then(array => {
			console.log(array)
		})

	})


		//return our array of values
		
}

module.exports = distanceCheck;