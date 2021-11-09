import React, { useEffect, useState } from 'react'
import { ICityProps } from '../interfaces/ICity'
import { FavoriteCityPreview } from '../components/FavoriteCityPreview'
import { FavoritesHeader } from '../components/FavoritesHeader'
import { cityService } from '../services/city-service'


export const Favorites = () => {

    const [favoriteCities, setFavoriteCities] = useState<ICityProps[]>([])

    useEffect(() => {
        const favoriteCities = cityService.getFavoriteCities()
        setFavoriteCities(favoriteCities)
    }, [])
    
    const removeFromFavorites = (city: ICityProps) => {
        const updatedFavoriteCities = cityService.toggleCityFavorite(city)
        setFavoriteCities(updatedFavoriteCities)
    }
    
    return (
        <div className="app">
            <div className="main-app">
                <FavoritesHeader/>
                <div className="favorite-cities-list">
                    {favoriteCities.map(city => <FavoriteCityPreview key={'favorite-' + city.Key} city={city} removeFromFavorites={removeFromFavorites}/>)}
                </div>
            </div>
        </div>
    )
}
