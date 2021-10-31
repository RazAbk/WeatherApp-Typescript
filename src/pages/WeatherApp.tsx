import React from 'react'
import { CitySearch } from '../components/CitySearch'
import { FiveDayForecast } from '../components/FiveDayForecast'
import { Header } from '../components/Header'
import { TodayWeather } from '../components/TodayWeather'
import { WeatherDetails } from '../components/WeatherDetails'
import { cityService } from '../services/city-service'

export const WeatherApp = () => {
    const hey = async () => {
        const hello = await cityService.getCitiesNames('ashq')
        console.log(hello)
    }
    hey()
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
                <CitySearch />
                <WeatherDetails />
            </div>
        </div>
    )
}
