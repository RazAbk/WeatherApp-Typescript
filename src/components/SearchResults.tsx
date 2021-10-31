import React from 'react'

interface ICities {
    cities: {
        Key: string;
        City: string;
        Country: string;
    }[]
}

export const SearchResults: React.FC<ICities> = ({cities}) => {
    return (
        <div>
            {cities.map(city => {
                return city.City
            })}
        </div>
    )
}
