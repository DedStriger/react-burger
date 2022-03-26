import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import modalStyle from './Modals.module.css'

export default function Modals(props){
    
const [show, setShow] = useState(props.show)

useEffect(() => {
    const handleEsc = (e) => {
        if(e.key === 'Escape'){
            setShow(false) 
        }
    }

    show ? document.addEventListener('keydown', handleEsc) : document.removeEventListener('keypress', handleEsc)

    return () => {document.removeEventListener('keydown', handleEsc)}
}, [show])

const activeClass = `${modalStyle.modal} ${modalStyle.active}`

    return createPortal(
        <div className={show ? activeClass : modalStyle.modal} onClick={() => setShow(false)}>
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
        </div>, document.getElementById('modals')
    )
}

Modals.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    show: PropTypes.bool
}