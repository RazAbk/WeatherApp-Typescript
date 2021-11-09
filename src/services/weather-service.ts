import axios from "axios"
import { ICurrentWeatherProps, IForecastProps } from "../interfaces/IWeather"
import { localStorageService } from "./local-storage.service"

export const weatherService = {
    getCurrentWeather,
    getFiveDayForecast
}

interface IWeather {
    [key: string]:{
        createdAt: number,
        data: ICurrentWeatherProps
    }
}

interface IForecase {
    [key: string]: {
        createdAt: number,
        data: IForecastProps
    }
}


const apiKey = process.env.REACT_APP_WEATHER_API
const currentWeatherKey = 'currentWeather'
const forecastKey = 'foreCast'


async function getCurrentWeather(cityKey: string) {
    const currentWeatherCache: IWeather = localStorageService.load(currentWeatherKey) || {}
    // Fetch Weather from cache (If exist)
    if (currentWeatherCache[cityKey]) {
        if(Date.now() -  currentWeatherCache[cityKey].createdAt < 1000 * 60 * 30){
            return currentWeatherCache[cityKey].data
        }
    }

    // Fetch Weather from API
    try {
        const currentWeather = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`)
        const weatherObj = currentWeather.data[0]

        currentWeatherCache[cityKey] = {
            data: weatherObj,
            createdAt: Date.now()
        }

        localStorageService.save(currentWeatherKey, currentWeatherCache)

        return weatherObj
    } catch (err) {
    }
}

async function getFiveDayForecast(cityKey: string) {
    const forecastCache: IForecase = localStorageService.load(forecastKey) || []
    // Fetch Forecast from cache (If exist)
    if(forecastCache[cityKey]){
        if(Date.now() - forecastCache[cityKey].createdAt < 1000 * 60 * 30){
            return forecastCache[cityKey].data
        }
    }
    
    // Fetch Forecast from API
    try{
        const foreCast = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=${true}`)
        const foreCastObj = foreCast.data.DailyForecasts

        forecastCache[cityKey] = {
            data: foreCastObj,
            createdAt: Date.now()
        }

        localStorageService.save(forecastKey, forecastCache)

        return foreCastObj

    } catch(err){
    }
}
