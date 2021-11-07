import React, { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const FavoritesHeader = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 850 ? true : false)

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

        return () => {
            window.removeEventListener('resize', updateState)
        }
    }, [])


    return (
        <div className="header">
        <div className="header-routing">
            {isMobile ? 
            <>
                <Link to='/'>
                    <FaHome/>
                </Link>
                
                <Link to='/favorites'>
                    <AiFillHeart/>
                </Link>
            </>
            :
            <>
                <Link to='/'>
                    <h2>WeatherApp</h2>
                </Link>
                <Link to='/favorites'>
                    <h2>Favorites</h2>
                </Link>
            </>
            }
        </div>
       
    </div>
    )
}
