import axios from "axios"
import { localStorageService } from "./local-storage.service"

export const cityService = {
    getCitiesNames
}

interface ICity {
    Key: string;
    LocalizedName: string;
    Country: {
        LocalizedName: string
    };
}

interface LooseObject {
    [key: string]: any
}


const apiKey = process.env.REACT_APP_WEATHER_API
const citiesKey = 'cities'

async function getCitiesNames(searchTxt: string) {
    const citiesCache: LooseObject = localStorageService.load(citiesKey) || {}

    console.log(citiesCache)

    // Fetch Cities from cache (If exist)
    if (citiesCache[searchTxt]) {
        // Todo: Add cache timing mechanism
        console.log('%c Got cities from Cache ', 'background: #222; color: #bada55');
        return citiesCache[searchTxt].data
    }

    // Fetch Cities from API
    try {
        const cities = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${searchTxt}`)
        const citiesMapObj = cities.data.map((city: ICity) => {
            return {
                Key: city.Key,
                City: city.LocalizedName,
                Country: city.Country.LocalizedName
            }
        })
        
        citiesCache[searchTxt] = {
            data: citiesMapObj,
            createdAt: Date.now()
        }
        
        localStorageService.save(citiesKey, citiesCache)
        
        console.log('%c Got cities from API ', 'background: #222; color: #bada55');
        return citiesMapObj
    } catch(err) {
        console.log('%c Failed to get Cities from API ', 'background: #222; color: #ff0000');
        throw new Error()
    }
}