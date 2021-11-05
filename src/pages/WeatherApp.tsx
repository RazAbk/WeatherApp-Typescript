import React, { useState } from 'react'
import { CitySearch } from '../components/CitySearch'
import { FiveDayForecast } from '../components/FiveDayForecast'
import { Header } from '../components/Header'
import { SearchResults } from '../components/SearchResults'
import { TodayWeather } from '../components/TodayWeather'
import { WeatherDetails } from '../components/WeatherDetails'
import { cityService } from '../services/city-service'
import { TodayWeatherContext } from '../components/context/TodayWeatherContext'

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

    const [cities, setCities] = useState([])
    const [currentCity, setCurrentCity] = useState<ICityProps | null>(null)

    const [todayWeather, setTodayWeather] = useState<any>(null)

    const getCities = async (searchTxt: string) => {
        const cities = await cityService.getCitiesNames(searchTxt)
        setCities(cities)
    }

    const onSetCitySearch = (searchTxt: string) => {
        getCities(searchTxt)
    }

    return (
        <div className="app">
            <TodayWeatherContext.Provider value={{todayWeather, setTodayWeather}}>

            <div className="main-app">
                <Header />
                <div className="weather-details-zone">
                    <TodayWeather city={currentCity} />
                    <FiveDayForecast city={currentCity}  />
                </div>
            </div>
            <div className="search-details-zone">
                <CitySearch onSetCitySearch={onSetCitySearch}/>
                <SearchResults cities={cities} setCurrentCity={setCurrentCity}/>
                {/* <WeatherDetails /> */}
            </div>
            </TodayWeatherContext.Provider>
        </div>
    )
}
