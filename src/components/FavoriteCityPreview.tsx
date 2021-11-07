import React, { useEffect, useState } from 'react'
import { weatherService } from '../services/weather-service'
import { ICurrentWeatherProps } from '../pages/WeatherApp'
import { ICityProps } from './context/TodayWeatherContext'
import { utilService } from '../services/util.service'
import { TiDelete } from 'react-icons/ti'
import { cityService } from '../services/city-service'

interface IFavoriteCityPreview {
    city: ICityProps;
    removeFromFavorites: (city: ICityProps) => void
}

export const FavoriteCityPreview = ({city, removeFromFavorites}: IFavoriteCityPreview) => {

    const [cityWeather, setCityWeather] = useState<ICurrentWeatherProps | null>(null)

    useEffect(() => {
        const getCityWeather = async () => {
            const cityWeather = await weatherService.getCurrentWeather(city.Key)
            setCityWeather(cityWeather)
        }

        getCityWeather()
    }, [city])

  

    if(!cityWeather) return null

    return (
        <div className="favorite-city-preview">
            <div className="remove-from-favorite-btn">
                <TiDelete onClick={() => {removeFromFavorites(city)}}/>
            </div>
            <div className="city-and-time">
                <div className="city-name">
                    {city.City}
                </div>
                <div className="city-time">
                    {utilService.getTime(cityWeather.LocalObservationDateTime)}
                </div>
            </div>
            <img src={`https://www.accuweather.com/images/weathericons/${cityWeather.WeatherIcon}.svg`} alt={cityWeather.WeatherText} />
            <h4 className="weather-text">{cityWeather.WeatherText}</h4>
            <h4 className="weather-temperature">{cityWeather.Temperature.Metric.Value.toFixed(0)}°</h4>
        </div>
    )
}
