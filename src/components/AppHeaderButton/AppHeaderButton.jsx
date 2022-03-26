import React from 'react'
import buttonStyles from './AppHeaderButton.module.css'
import PropTypes from 'prop-types'

export default function AppHeaderButton({Icon, color, title}){
    return(
        <a href='/' className={buttonStyles.container}>
            {Icon}
            <span className='text text_type_main-default ml-4' style={{color: color}}>{title}</span>
        </a>
    )
}

AppHeaderButton.propTypes = {
    Icon: PropTypes.element.isRequired,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}