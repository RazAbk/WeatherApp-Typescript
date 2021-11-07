import axios from "axios"
import { ICityProps } from "../components/context/TodayWeatherContext" 
import { localStorageService } from "./local-storage.service"

export const cityService = {
    getCitiesNames,
    getCityByGeolocation,
    toggleCityFavorite,
    isCityFavorite,
    getFavoriteCities
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
const favoriteCitiesKey = 'favoriteCities'

async function getCitiesNames(searchTxt: string) {
    const citiesCache: LooseObject = localStorageService.load(citiesKey) || {}

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
    }
}

interface ICoords{
    lat: number;
    lng: number;
}

async function getCityByGeolocation({lat, lng}: ICoords = {lat: -1, lng: -1}): Promise<ICityProps> {
    try{ 

        if(lat === -1 && lng === -1){
            return Promise.resolve({
                Key: "215854",
                City: "Tel Aviv",
                Country: "Israel"
            })
        }

        // const city = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C%20${lng}`)

        // console.log('%c Got City from API ', 'background: #222; color: #bada55');
        // return {
        //     Key: city.data.Key,
        //     City: city.data.LocalizedName,
        //     Country: city.data.Country.LocalizedName
        // }


        return Promise.resolve({
            Key: "215854",
            City: "Tel Aviv",
            Country: "Israel"
        })

    } catch(err) {
        console.log('%c Failed to get City from API ', 'background: #222; color: #ff0000');
        return Promise.resolve({
            Key: "215854",
            City: "Tel Aviv",
            Country: "Israel"
        })
    }

}

function toggleCityFavorite(city: ICityProps){
    const favoriteCities: LooseObject = localStorageService.load(favoriteCitiesKey) || []
    
    const idx = favoriteCities.findIndex((favCity: ICityProps): boolean => favCity.Key === city.Key)
    
    if(idx !== -1){
      favoriteCities.splice(idx,1)
    } else {
      favoriteCities.push(city)
    }
    
    localStorageService.save(favoriteCitiesKey, favoriteCities)
  }
  
  function isCityFavorite(cityKey: string) {
    const favoriteCities: ICityProps[] = localStorageService.load(favoriteCitiesKey) || []
  
    return favoriteCities.some(favCity => favCity.Key === cityKey)
  }
  
  function getFavoriteCities() {
    return localStorageService.load(favoriteCitiesKey) || []
  }
  