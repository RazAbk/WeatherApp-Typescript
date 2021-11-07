import React, { useContext } from 'react'
import { TodayWeatherContext } from '../components/context/TodayWeatherContext'

export const WeatherDetails = () => {

    const { todayWeather } = useContext(TodayWeatherContext)

    return (
        <div className="weather-details">
            <h2>Weather Details</h2>
            {todayWeather?.WeatherText}
        </div>
    )
}
