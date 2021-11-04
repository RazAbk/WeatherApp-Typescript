import axios from "axios"
import { localStorageService } from "./local-storage.service"

export const weatherService = {
    getCurrentWeather
}

interface LooseObject {
    [key: string]: any
}


const apiKey = process.env.REACT_APP_WEATHER_API
const currentWeatherKey = 'currentWeather'


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
