import React, { useEffect, useState } from 'react'
import { ICityProps } from '../components/context/TodayWeatherContext'
import { FavoriteCityPreview } from '../components/FavoriteCityPreview'
import { FavoritesHeader } from '../components/FavoritesHeader'
import { cityService } from '../services/city-service'


export const Favourites = () => {

    const [favoriteCities, setFavoriteCities] = useState<ICityProps[]>([])

    useEffect(() => {
        const favoriteCities = cityService.getFavoriteCities()
        setFavoriteCities(favoriteCities)
    }, [])
    
    return (
        <div className="app">
            <div className="main-app">
                <FavoritesHeader/>
                <div className="favorite-cities-list">
                    {favoriteCities.map(city => <FavoriteCityPreview key={'favorite-' + city.Key} city={city}/>)}
                </div>
            </div>
        </div>
    )
}
