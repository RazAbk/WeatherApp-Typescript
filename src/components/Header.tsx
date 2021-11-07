import React, { useContext, useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaHome } from 'react-icons/fa'
import { IWeatherContext, TodayWeatherContext } from './context/TodayWeatherContext'
import { weatherService } from '../services/weather-service'


interface IHeaderProps {
    isMobileMenu: boolean;
    toggleMobileMenu: (action: boolean) => void
}

export const Header = ({isMobileMenu, toggleMobileMenu}: IHeaderProps) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 850 ? true : false)
    const { currentCity } = useContext<IWeatherContext>(TodayWeatherContext)
    const [isFavorite, setFavorite] = useState(false)

    const updateState = () => {
        const windowWidth = window.innerWidth

        if(windowWidth < 850){
            setIsMobile(true)
        } else if(windowWidth > 850){
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', updateState)

        if(currentCity){
            setFavorite(weatherService.isCityFavorite(currentCity.Key))
        }

        return () => {
            window.removeEventListener('resize', updateState)
        }
    }, [currentCity])

    const onToggleFavorite = () => {
        if(currentCity){
            weatherService.toggleCityFavorite(currentCity.Key)
            setFavorite(prevState => !prevState)
        }
    }


    return (
        <div className="header">
            <div className="header-routing">
                {isMobile ? 
                <>
                    <FaHome/>
                    <AiFillHeart/>
                </>
                :
                <>
                    <h2>Weather App</h2>
                    <h2>Favorites</h2>
                </>
                }
            </div>
            {isMobile ? 
                <GiHamburgerMenu className="mobile-hamburger-btn" onClick={() => {toggleMobileMenu(!isMobileMenu)}} />
            :
                <div className="header-favorite-sate">
                    {isFavorite ? <AiFillHeart onClick={onToggleFavorite}/> : <AiOutlineHeart onClick={onToggleFavorite}/>}
                </div>
            }
        </div>
    )
}
