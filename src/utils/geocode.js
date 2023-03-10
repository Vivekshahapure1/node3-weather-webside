const request=require('request')
const geocode=(address,callback)=>{
    const geoco='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmlraXRhMTgwOCIsImEiOiJjbGU4M2s5MHYwYmpiNDFuMWVvcGpiZjFiIn0.PNbzyADupyR6HfvYo3ft9A';
    request({url: geoco, json: true},(error, response)=>{
        if(error){
            callback("unable to connect to the location sever", undefined);
        }
        else if(response.body.features.length===0){
            callback("unable to find location try another search", undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;