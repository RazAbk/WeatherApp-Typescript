import React, { useContext, useEffect, useState } from 'react'
import { ICityProps } from '../pages/WeatherApp'
import { weatherService } from '../services/weather-service'
import { IForecastProps } from '../pages/WeatherApp'
import { utilService } from '../services/util.service'
import { IWeatherContext, TodayWeatherContext } from './context/TodayWeatherContext'

export const FiveDayForecast = ({city}: { city: ICityProps | null }) => {

    const [foreCast, setForecast] = useState<IForecastProps[] | null>(null)
    const { todayWeather } = useContext<IWeatherContext>(TodayWeatherContext)

    useEffect(() => {
        const getForeCast = async (cityKey: string) => {
            const foreCast: IForecastProps[] = await weatherService.getFiveDayForecast(cityKey)
            console.log('foreCast', foreCast)
            setForecast(foreCast)
        }

        if(city){
            getForeCast(city.Key)
        }
    }, [city])

    if(!city || !foreCast) return null

    return (
        <div className="five-day-forecast">
            {foreCast.map(day => {
                return <div key={city.Key+day.EpochDate} className="forecast-day">
                           <h4>{utilService.getDay(day.Date)}</h4>
                           <img src={`https://www.accuweather.com/images/weathericons/${todayWeather.IsDayTime ? day.Day.Icon : day.Night.Icon}.svg`} 
                                alt={todayWeather.IsDayTime ? day.Day.IconPhrase : day.Night.IconPhrase} />
                            <h3>{todayWeather.IsDayTime ? day.Day.IconPhrase : day.Night.IconPhrase}</h3>
                            <h3>{`${day.Temperature.Minimum.Value.toFixed(0)}° / ${day.Temperature.Maximum.Value.toFixed(0)}°`}</h3>
                       </div>
            })}
        </div>
    )
}

