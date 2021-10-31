import React from 'react'
import { utilService } from '../services/util.service'


interface IProps {
    onSetCitySearch: (searchTxt: string) => void;
}

export const CitySearch: React.FC<IProps> = ({onSetCitySearch}) => {

    const debounceTxt = (txt: string) => {
        onSetCitySearch(txt)
    }

    const onDebounce = utilService.debounce(debounceTxt, 500);

    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDebounce(event.target.value)
    }


    return (
        <div className="city-search">
            <input className="city-input" type="text" placeholder="Search" onChange={onInput}/>
        </div>
    )
}
