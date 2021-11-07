import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillHeart } from 'react-icons/ai'
import { FaHome } from 'react-icons/fa'

interface IHeaderProps {
    toggleMobileMenu: () => void
}

export const Header = ({toggleMobileMenu}: IHeaderProps) => {

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

    const style = {
        show: {
            display: 'initial'
        },
        dontShow: {
            display: 'none'
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
            <div className="header-menu" style={isMobile ? style.show : style.dontShow}>
                <GiHamburgerMenu className="mobile-hamburger-btn" onClick={toggleMobileMenu} />
            </div>
        </div>
    )
}
