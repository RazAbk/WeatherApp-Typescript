import axios from "axios"
import { localStorageService } from "./local-storage.service"

export const weatherService = {
    getCurrentWeather,
    getFiveDayForecast
}

interface LooseObject {
    [key: string]: any
}


const apiKey = process.env.REACT_APP_WEATHER_API
const currentWeatherKey = 'currentWeather'
const forecastKey = 'foreCast'


async function getCurrentWeather(cityKey: string) {
    const currentWeatherCache: LooseObject = localStorageService.load(currentWeatherKey) || {}
    // Fetch Weather from cache (If exist)
    if (currentWeatherCache[cityKey]) {
        // Todo: Add cache timing mechanism
        console.log('%c Got Weather from Cache ', 'background: #222; color: #bada55');
        return currentWeatherCache[cityKey].data
    }

    // Fetch Weather from API
    try {
        const currentWeather = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`)
        const weatherObj = currentWeather.data[0]

        currentWeatherCache[cityKey] = {
            data: weatherObj,
            createdAt: Date.now()
        }

        localStorageService.save(currentWeatherKey, currentWeatherCache)

        console.log('%c Got Weather from API ', 'background: #222; color: #bada55');
        return weatherObj
    } catch (err) {
        console.log('%c Failed to get Weather from API ', 'background: #222; color: #ff0000');
    }
}

async function getFiveDayForecast(cityKey: string) {
    const forecastCache: LooseObject = localStorageService.load(forecastKey) || []
    // Fetch Forecast from cache (If exist)
    if(forecastCache[cityKey]){
        // Todo: Add cache timing mechanism
        console.log('%c Got Forecast from Cache ', 'background: #222; color: #bada55');
        return forecastCache[cityKey].data
    }
    
    // Fetch Forecast from API
    try{
        const foreCast = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=${true}`)
        const foreCastObj = foreCast.data.DailyForecasts

        forecastCache[cityKey] = {
            data: foreCastObj,
            createdAt: Date.now()
        }

        localStorageService.save(forecastKey, forecastCache)

        console.log('%c Got Forecast from API ', 'background: #222; color: #bada55');
        return foreCastObj

    } catch(err){
        console.log('%c Failed to get Forecast from API ', 'background: #222; color: #ff0000');
    }
}


// const obj = {
//     "Headline": {
//       "EffectiveDate": "2021-11-05T19:00:00+02:00",
//       "EffectiveEpochDate": 1636131600,
//       "Severity": 7,
//       "Text": "Warm Friday night",
//       "Category": "heat",
//       "EndDate": "2021-11-06T07:00:00+02:00",
//       "EndEpochDate": 1636174800,
//       "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us",
//       "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
//     },
//     "DailyForecasts": [
//       {
//         "Date": "2021-11-05T07:00:00+02:00",
//         "EpochDate": 1636088400,
//         "Temperature": {
//           "Minimum": {
//             "Value": 20.9,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 30.2,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 1,
//           "IconPhrase": "Sunny",
//           "HasPrecipitation": false
//         },
//         "Night": {
//           "Icon": 33,
//           "IconPhrase": "Clear",
//           "HasPrecipitation": false
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
//       },
//       {
//         "Date": "2021-11-06T07:00:00+02:00",
//         "EpochDate": 1636174800,
//         "Temperature": {
//           "Minimum": {
//             "Value": 21.6,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 28.6,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 6,
//           "IconPhrase": "Mostly cloudy",
//           "HasPrecipitation": false
//         },
//         "Night": {
//           "Icon": 33,
//           "IconPhrase": "Clear",
//           "HasPrecipitation": false
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
//       },
//       {
//         "Date": "2021-11-07T07:00:00+02:00",
//         "EpochDate": 1636261200,
//         "Temperature": {
//           "Minimum": {
//             "Value": 21.8,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 28.3,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 1,
//           "IconPhrase": "Sunny",
//           "HasPrecipitation": false
//         },
//         "Night": {
//           "Icon": 33,
//           "IconPhrase": "Clear",
//           "HasPrecipitation": false
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
//       },
//       {
//         "Date": "2021-11-08T07:00:00+02:00",
//         "EpochDate": 1636347600,
//         "Temperature": {
//           "Minimum": {
//             "Value": 21.3,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 28.6,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 1,
//           "IconPhrase": "Sunny",
//           "HasPrecipitation": false
//         },
//         "Night": {
//           "Icon": 34,
//           "IconPhrase": "Mostly clear",
//           "HasPrecipitation": false
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
//       },
//       {
//         "Date": "2021-11-09T07:00:00+02:00",
//         "EpochDate": 1636434000,
//         "Temperature": {
//           "Minimum": {
//             "Value": 20.8,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 28,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 1,
//           "IconPhrase": "Sunny",
//           "HasPrecipitation": false
//         },
//         "Night": {
//           "Icon": 33,
//           "IconPhrase": "Clear",
//           "HasPrecipitation": false
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
//       }
//     ]
//   }