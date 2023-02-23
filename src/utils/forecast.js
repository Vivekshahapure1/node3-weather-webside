const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    console.log(latitude)
    console.log(longitude)
    // const lati=latitude.latitude;
    // const long=latitude.longitude;
    // console.log(longitude)
    const urlcode='http://api.weatherstack.com/current?access_key=3f8b77afd7b271d8eaee0ef685018cae&query='+latitude+','+longitude+'&units=f'
    console.log(urlcode)
    request({url: urlcode,json: true},(error,response)=>{
        if(error){
            callback("unable to get the location of the sever", undefined)
        }
        else if(response.body.error){
            callback('unable to find location try another search', undefined)
        }
        else{
            callback(undefined,'It feels like '+response.body.current.weather_descriptions+' It is currently '+response.body.current.temperature+' degress out. It feels like '+response.body.current.feelslike+' degress out.')
        }
    })
}
module.exports=forecast;
