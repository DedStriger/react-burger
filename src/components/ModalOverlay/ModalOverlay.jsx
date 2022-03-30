import React from 'react'
import overlayStyle from './ModalOverlay.module.css'
import PropTypes from 'prop-types'

export default function ModalOverlay(props){
    const active = props.active ? `${overlayStyle.overlay} ${overlayStyle.active}` : overlayStyle.overlay
    return (
        <div className={active} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    active: PropTypes.bool.isRequired
}