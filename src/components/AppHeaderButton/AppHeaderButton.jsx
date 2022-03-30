import React from 'react'
import buttonStyles from './AppHeaderButton.module.css'
import PropTypes from 'prop-types'

export default function AppHeaderButton({icon, color, title}){
    return(
        <a href='/' className={buttonStyles.container}>
            {icon}
            <span className='text text_type_main-default ml-4' style={{color: color}}>{title}</span>
        </a>
    )
}

AppHeaderButton.propTypes = {
    icon: PropTypes.element.isRequired,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}