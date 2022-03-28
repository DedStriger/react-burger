import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import modalStyle from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay';

export default function Modal(props){
    

useEffect(() => {
    const handleEsc = (e) => {
        if(e.key === 'Escape'){
            props.onClose()
        }
    }

   document.addEventListener('keydown', handleEsc)

    return () => {document.removeEventListener('keydown', handleEsc)}
}, [])


    return createPortal(
        <ModalOverlay active={true}  onClick={props.onClose}>
            <div className={modalStyle.card} onClick={(e) => e.stopPropagation()}>
                <div className={modalStyle.header}>
                    <div className="text text_type_main-large">
                        {props.title}
                    </div>
                    <div className={modalStyle.close} onClick={props.onClose}>
                        <CloseIcon type='primary'/>
                    </div>
                </div>
                {props.children}
            </div>
        </ModalOverlay>
        , document.getElementById('modals')
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
}