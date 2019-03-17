const request = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/f9ef095c773d567e45aeb0a485e6dfef/'+ lat +','+ long 

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Not able to make the request',undefined)
        }
        else if(body.error){
            callback('Unable to find location !',undefined)
        }
        else{
            callback(undefined,{
                description : body.daily.data[0].summary + ', humidity : '+ body.daily.data[0].humidity + '. It is currently '+ body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability + '% chance of rain'
            })
        }
    })
}

module.exports = forecast
