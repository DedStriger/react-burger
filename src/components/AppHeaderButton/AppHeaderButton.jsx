import React from 'react'
import buttonStyles from './AppHeaderButton.module.css'

export default function AppHeaderButton({Icon, color, title}){
    return(
        <a href='#' className={buttonStyles.container}>
            {Icon}
            <span className={buttonStyles.title + 'text text_type_main-default'} style={{color: color, marginLeft: 8}}>{title}</span>
        </a>
    )
}