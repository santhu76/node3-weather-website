
const request = require('request')

const geocode = (address, callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2FudGh1NzYiLCJhIjoiY2p0NDRlbnM3MTFmdDN5cGcwdno0eGxiaiJ9.ev6TEJHPlT26jtX9K-2Jig'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Not able to connect !',undefined)
        }
        else if(body.error){
            callback('Invalid response',undefined)
        }
        else if(body.features.length === 0 ){
            callback('Invalid request',undefined)
        }
        else{

            callback(undefined,{
                lat:body.features[0].center[1],
                long:body.features[0].center[0],
                place:body.features[0].place_name
            })
        }
    })
}
    module.exports = geocode