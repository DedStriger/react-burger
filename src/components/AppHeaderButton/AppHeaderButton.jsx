import React from 'react'
import buttonStyles from './AppHeaderButton.module.css'
import PropTypes from 'prop-types'

export default function AppHeaderButton({icon, color, title, href}){
    return(
        <div className={buttonStyles.container} onClick={href}>
            {icon}
            <span className='text text_type_main-default ml-4' style={{color: color}}>{title}</span>
        </div>
    )
}

AppHeaderButton.propTypes = {
    icon: PropTypes.element.isRequired,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    href: PropTypes.func
}