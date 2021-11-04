import React, { useContext, useEffect } from 'react'
import { ICityProps } from '../pages/WeatherApp'
import { utilService } from '../services/util.service'
import { weatherService } from '../services/weather-service'
import { TodayWeatherContext, IWeatherContext } from './context/TodayWeatherContext'


export const TodayWeather = ({ city }: { city: ICityProps | null }) => {

    const { todayWeather, setTodayWeather } = useContext<IWeatherContext>(TodayWeatherContext)

    useEffect(() => {
        const getCurrentWeather = async (cityKey: string) => {
            const currentWeather = await weatherService.getCurrentWeather(cityKey)
            setTodayWeather(currentWeather)
        }
        if (city) {
            getCurrentWeather(city.Key)
        }
    }, [city, setTodayWeather])


    console.log('currentWeather from context', todayWeather)



    if (!city || !todayWeather) return null

    return (
        <div className="todays-weather">
            <div className="temp-display">
                26°
            </div>
            <div className="city-and-time">
                <div className="city-name">
                    {city.City}
                </div>
                <div className="city-time">
                    {utilService.getTime(todayWeather.EpochTime)}
                </div>
            </div>
            <div className="weather-preview">
                INFO
            </div>
        </div>
    )
}
