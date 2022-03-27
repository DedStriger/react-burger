import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import modalStyle from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay';

export default function Modal(props){
    
const [show, setShow] = useState(true)

useEffect(() => {
    const handleEsc = (e) => {
        if(e.key === 'Escape'){
            setShow(false) 
        }
    }

    show ? document.addEventListener('keydown', handleEsc) : document.removeEventListener('keypress', handleEsc)

    return () => {document.removeEventListener('keydown', handleEsc)}
}, [show])


    return createPortal(
        <ModalOverlay active={show} onClick={() => setShow(false)}>
            <div className={modalStyle.card} onClick={(e) => e.stopPropagation()}>
                <div className={modalStyle.header}>
                    <div className="text text_type_main-large">
                        {props.title}
                    </div>
                    <div className={modalStyle.close} onClick={() => setShow(false)}>
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
}