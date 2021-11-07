import React from 'react'
import { ICityProps } from '../pages/WeatherApp'

interface ICitiesProps {
    cities: ICityProps[]
    setCurrentCity: React.Dispatch<React.SetStateAction<ICityProps | null>>;
    toggleMobileMenu: (action: boolean) => void;
}

export const SearchResults = ({ cities, setCurrentCity, toggleMobileMenu }: ICitiesProps) => {
    return (
        <div className={`cities-list ${(cities && cities.length > 0) ? 'show' : ''}`}>
            <ul>
                {(cities && cities.length > 0) && cities.map(city => {
                    return <li onClick={() => {setCurrentCity(city); toggleMobileMenu(false)}} key={`item-${city.Key}`} className="city-item">{city.City}, {city.Country}</li>
                })}
            </ul>
        </div>
    )
}
