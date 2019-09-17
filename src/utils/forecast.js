const request = require('request')

const forecast = ( long, lat, callback ) => {

    const url = 'https://api.darksky.net/forecast/4973406940a54245efb65416f0653bbd/'+ long +','+lat+'?units=si'

    request({ url, json:true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to forecast servie', undefined)
        } else if  (body.error){
            callback('Unable to find the location, enter a new search', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} 
            It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
            console.log(body.daily.data[0].icon)
        }
    })
}

 
module.exports = forecast

// const url = 'https://api.darksky.net/forecast/4973406940a54245efb65416f0653bbd/37.8267,-122.4233?units=si'


//fist arg is an options object outlines what we'd like to do, URL
//second arg is a function we wanna do, when we have the repsonse
// request({ url: url, json: true }, (error, response) => {
//    if (error){
//     console.log('Unable to connect to weather service')
//    } else if (response.body.error ) {
//     console.log('unable to find location')
//    } else {
//     const current = response.body.currently
//    console.log(`It is currently ${current.temperature} degrees out. There is a ${current.precipProbability}% chance of rain.`)
//    }  
// })