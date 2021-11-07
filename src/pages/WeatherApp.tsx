import React, { useEffect, useRef, useState } from 'react'
import { CitySearch } from '../components/CitySearch'
import { FiveDayForecast } from '../components/FiveDayForecast'
import { Header } from '../components/Header'
import { SearchResults } from '../components/SearchResults'
import { TodayWeather } from '../components/TodayWeather'
import { cityService } from '../services/city-service'
import { TodayWeatherContext } from '../components/context/TodayWeatherContext' 
import { Screen } from '../components/Screen'

export interface ICityProps {
    Key: string;
    City: string;
    Country: string;
}

export interface ICurrentWeatherProps {
    EpochTime: string;
    LocalObservationDateTime: string;
    WeatherText: string;
    WeatherIcon: number;
    IsDayTime: boolean;
    Temperature: {
        Metric: {
          Value: number,
          Unit: string,
          UnitType: number
        },
        Imperial: {
          Value: number,
          Unit: string,
          UnitType: number
        }
      }
}

export interface IForecastProps {
        Date: string;
        EpochDate: number;
        Temperature: {
          Minimum: {
            Value: number,
            Unit: string,
            UnitType: number;
          },
          Maximum: {
            Value: number,
            Unit: string,
            UnitType: number
          }
        },
        Day: {
          Icon: number,
          IconPhrase: string,
          HasPrecipitation: boolean
        },
        Night: {
          Icon: number,
          IconPhrase: string,
          HasPrecipitation: boolean
        },
        Sources: string[],
        MobileLink: string,
        Link: string
}

export const WeatherApp = () => {

    const [cities, setCities] = useState<ICityProps[]>([])
    const [currentCity, setCurrentCity] = useState<ICityProps | null>(null)
    const [todayWeather, setTodayWeather] = useState<any>(null)
    const [isMobileMenu, setMobileMenu] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      // Get user's current location (lat,lng) => get user's current city by Api
      // If device/browser doesn't support geolocation, get default location (tel aviv)
      const getUserCoords = () => {
        navigator.geolocation.getCurrentPosition( async (geoLocation) => {
          const userCoords = {
            lat: geoLocation.coords.latitude,
            lng: geoLocation.coords.longitude
          }
          
          const city = await cityService.getCityByGeolocation(userCoords)
          setCurrentCity(city)
        }, async () => {
          const city = await cityService.getCityByGeolocation()
          setCurrentCity(city)
        })

      }
      
      getUserCoords()

    }, [])

    const getCities = async (searchTxt: string) => {
        const cities = await cityService.getCitiesNames(searchTxt)
        setCities(cities)
    }

    const onSetCitySearch = (searchTxt: string) => {
        getCities(searchTxt)
    }

    const toggleMobileMenu = (action: boolean) => {
        setMobileMenu(action)
    }

    const clearSearch = () => {
      setCities([])
      if(inputRef.current){
        inputRef.current.value = ''
      }
    }

    return (
        <>
        <div className="app">
            <TodayWeatherContext.Provider value={{todayWeather, setTodayWeather, currentCity}}>
              <div className="main-app">
                  <Header isMobileMenu={isMobileMenu} toggleMobileMenu={toggleMobileMenu}/>
                  <div className="weather-details-zone">
                      <TodayWeather city={currentCity} />
                      <FiveDayForecast city={currentCity}  />
                  </div>
              </div>
              <div className={`search-details-zone ${isMobileMenu ? 'show-menu' : ''}`}>
                  <CitySearch inputRef={inputRef} onSetCitySearch={onSetCitySearch}/>
                  <SearchResults cities={cities} setCurrentCity={setCurrentCity} toggleMobileMenu={toggleMobileMenu} clearSearch={clearSearch}/>
              </div>
            </TodayWeatherContext.Provider>
          </div>
          <Screen isOpen={isMobileMenu} exitScreen={toggleMobileMenu}/>
        </>
    )
}
