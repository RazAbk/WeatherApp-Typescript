import axios from "axios"
import { ICityProps } from '../interfaces/ICity' 
import { localStorageService } from "./local-storage.service"

export const cityService = {
    getCitiesNames,
    getCityByGeolocation,
    toggleCityFavorite,
    isCityFavorite,
    getFavoriteCities,
    getCityByKey
}

interface ICity {
    Key: string;
    LocalizedName: string;
    Country: {
        LocalizedName: string
    };
}

interface ICityCache {
    [key: string]: {
        createdAt: number,
        data: ICity[]
    }
}

const apiKey = process.env.REACT_APP_WEATHER_API
const citiesKey = 'cities'
const favoriteCitiesKey = 'favoriteCities'

async function getCitiesNames(searchTxt: string) {
    const citiesCache: ICityCache = localStorageService.load(citiesKey) || {}

    // Fetch Cities from cache (If exist)
    if (citiesCache[searchTxt]) {
        return citiesCache[searchTxt].data
    }

    // Fetch Cities from API
    try {
        const cities = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${searchTxt}`)
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
        
        return citiesMapObj
    } catch(err) {
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

        const city = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C%20${lng}`)

        return {
            Key: city.data.Key,
            City: city.data.LocalizedName,
            Country: city.data.Country.LocalizedName
        }

        // Dev only:

        // return Promise.resolve({
        //     Key: "215854",
        //     City: "Tel Aviv",
        //     Country: "Israel"
        // })

    } catch(err) {
        return Promise.resolve({
            Key: "215854",
            City: "Tel Aviv",
            Country: "Israel"
        })
    }

}

async function getCityByKey(cityKey: string){
    const citiesCache = localStorageService.load(citiesKey) || []

    // Try fetching from cache
    for(const key in citiesCache){
        const idx = citiesCache[key].data.findIndex((city: ICity) => city.Key === cityKey)
        if(idx !== -1){
            return Promise.resolve(citiesCache[key].data[idx])
        }
    }

    try{
        const city = await axios.get(`https://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=${apiKey}`)
        return city
    } catch(err){
    }
}

function toggleCityFavorite(city: ICityProps){
    const favoriteCities: ICityProps[] = localStorageService.load(favoriteCitiesKey) || []
    
    const idx = favoriteCities.findIndex((favCity: ICityProps): boolean => favCity.Key === city.Key)
    
    if(idx !== -1){
      favoriteCities.splice(idx,1)
    } else {
      favoriteCities.push(city)
    }
    
    localStorageService.save(favoriteCitiesKey, favoriteCities)
    return favoriteCities
  }
  
  function isCityFavorite(cityKey: string) {
    const favoriteCities: ICityProps[] = localStorageService.load(favoriteCitiesKey) || []
  
    return favoriteCities.some(favCity => favCity.Key === cityKey)
  }
  
  function getFavoriteCities() {
    return localStorageService.load(favoriteCitiesKey) || []
  }
  