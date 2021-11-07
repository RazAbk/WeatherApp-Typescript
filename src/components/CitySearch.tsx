import React, { RefObject } from 'react'
import { utilService } from '../services/util.service'


interface IProps {
    onSetCitySearch: (searchTxt: string) => void;
    inputRef: RefObject<HTMLInputElement>;
}

export const CitySearch = ({onSetCitySearch, inputRef}: IProps) => {

    const debounceTxt = (txt: string) => {
        onSetCitySearch(txt)
    }

    const onDebounce = utilService.debounce(debounceTxt, 500);

    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDebounce(event.target.value)
    }


    return (
        <div className="city-search">
            <input ref={inputRef} className="city-input" type="text" placeholder="Search" onChange={onInput}/>
        </div>
    )
}
