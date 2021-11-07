import React from 'react'
import { ICityProps } from '../pages/WeatherApp'

interface ICitiesProps {
    cities: ICityProps[]
    setCurrentCity: React.Dispatch<React.SetStateAction<ICityProps | null>>;
    toggleMobileMenu: (action: boolean) => void;
    clearSearch: () => void;
}

export const SearchResults = ({ cities, setCurrentCity, toggleMobileMenu, clearSearch }: ICitiesProps) => {

    const onCityClick = (city: ICityProps) => {
        setCurrentCity(city)
        toggleMobileMenu(false)
        clearSearch()
    }
    
    return (
        <div className={`cities-list ${(cities && cities.length > 0) ? 'show' : ''}`}>
            <ul>
                {(cities && cities.length > 0) && cities.map(city => {
                    return <li onClick={() => {onCityClick(city)}} key={`item-${city.Key}`} className="city-item">{city.City}, {city.Country}</li>
                })}
            </ul>
        </div>
    )
}
