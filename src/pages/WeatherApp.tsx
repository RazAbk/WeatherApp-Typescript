import React, { useState } from 'react'
import { CitySearch } from '../components/CitySearch'
import { FiveDayForecast } from '../components/FiveDayForecast'
import { Header } from '../components/Header'
import { SearchResults } from '../components/SearchResults'
import { TodayWeather } from '../components/TodayWeather'
import { WeatherDetails } from '../components/WeatherDetails'
import { cityService } from '../services/city-service'

export const WeatherApp = () => {

    const [cities, setCities] = useState([])

    const getCities = async (searchTxt: string) => {
        const cities = await cityService.getCitiesNames(searchTxt)
        setCities(cities)
    }

    const onSetCitySearch = (searchTxt: string) => {
        getCities(searchTxt)
    }

    return (
        <div className="app">
            <div className="main-app">
                <Header />
                <div className="weather-details-zone">
                    <TodayWeather />
                    <FiveDayForecast />
                </div>
            </div>
            <div className="search-details-zone">
                <CitySearch onSetCitySearch={onSetCitySearch}/>
                {(cities && cities.length > 0) && <SearchResults cities={cities}/>}
                <WeatherDetails />
            </div>
        </div>
    )
}
