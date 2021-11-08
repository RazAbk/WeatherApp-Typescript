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
        if(currentWeatherCache[cityKey].createdAt < 1000 * 60 * 30){
            console.log('%c Got Weather from Cache ', 'background: #222; color: #bada55');
            return currentWeatherCache[cityKey].data
        }
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
        if(forecastCache[cityKey].createdAt < 1000 * 60 * 30){
            console.log('%c Got Forecast from Cache ', 'background: #222; color: #bada55');
            return forecastCache[cityKey].data
        }
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
