import React, { useEffect, useState } from 'react'
import { FavoritesHeader } from '../components/FavoritesHeader'
import { weatherService } from '../services/weather-service'


export const Favourites = () => {

    const [favoriteCities, setFavoriteCities] = useState<string[]>([])

    useEffect(() => {
        const favoriteCities = weatherService.getFavoriteCities()
        setFavoriteCities(favoriteCities)
    }, [])
    
    return (
        <div className="app">
            <div className="main-app">
                <FavoritesHeader/>
                <div className="favorite-cities-list">
                    {favoriteCities.map(city => {
                        return (
                            <div className="favorite-city-preview">
                                preview: {city}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
