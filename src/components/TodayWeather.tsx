import React, { useContext, useEffect, useState } from 'react'
import { ICityProps } from '../pages/WeatherApp'
import { utilService } from '../services/util.service'
import { weatherService } from '../services/weather-service'
import { TodayWeatherContext, IWeatherContext } from './context/TodayWeatherContext'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'


export const TodayWeather = ({ city }: { city: ICityProps | null }) => {

    const { todayWeather, setTodayWeather } = useContext<IWeatherContext>(TodayWeatherContext)
    const [ isFavorite, setFavorite ] = useState(false)

    useEffect(() => {
        const getCurrentWeather = async (cityKey: string) => {
            const currentWeather = await weatherService.getCurrentWeather(cityKey)
            setTodayWeather(currentWeather)
        }
        if (city) {
            getCurrentWeather(city.Key)
            setFavorite(weatherService.isCityFavorite(city.Key))
        }
    }, [city, setTodayWeather])

    const onToggleFavorite = () => {
        if(city){
            weatherService.toggleCityFavorite(city.Key)
            setFavorite(prevState => !prevState)
        }
    }

    console.log('currentWeather from context', todayWeather)


    if (!city || !todayWeather) return null

    return (
        <div className="todays-weather">
            <div className="city-favorite-state">
                {isFavorite ? 
                    <AiFillHeart onClick={onToggleFavorite}/>
                :
                    <AiOutlineHeart onClick={onToggleFavorite}/>
                }
            </div>
            <div className="temp-display">
                {todayWeather.Temperature.Metric.Value.toFixed(0)}°
            </div>
            <div className="city-and-time">
                <div className="city-name">
                    {city.City}
                </div>
                <div className="city-time">
                    {utilService.getTime(todayWeather.LocalObservationDateTime)}
                </div>
            </div>
            <div className="weather-preview">
                <img src={`https://www.accuweather.com/images/weathericons/${todayWeather.WeatherIcon}.svg`} alt={todayWeather.WeatherText} />
                <p>{todayWeather.WeatherText}</p>
            </div>
        </div>
    )
}
