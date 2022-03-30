import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useMemo, useState } from 'react'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import constructorStyles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types'

export default function BurgerConstructor(props){
    const ingredientsLength = 6
    const [state, setState] = useState({showOrder: false, price: 2400 + (props.data[8].price * ingredientsLength)})

    return (
        <div>
        <div className={constructorStyles.element}>
                <ConstructorElement type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                     <div className={constructorStyles.scroll_container}>
                        {
                            new Array(ingredientsLength).fill(0).map((_, index) => 
                             ( <div className={constructorStyles.item} key={index}>
                                    <DragIcon className='mr-2' type='primary'/>
                                    <ConstructorElement
                                        isLocked={false}
                                        text={props.data[8].name}
                                        price={props.data[8].price}
                                        thumbnail={props.data[8].image_large}/>
                                </div>))
                        }
                       
                    </div>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
            </div>
             <div className={constructorStyles.footer + ' mt-10'}>
                <p className='mr-10'>
                    <span className='text text_type_digits-medium mr-2'>{state.price}</span>
                    <span className={constructorStyles.icon}><CurrencyIcon type='primary'/></span>
                </p>
                <Button type="primary" size="medium" onClick={() => setState({...state, showOrder: true})}>
                    Оформить заказ
                </Button>
            </div>
            { state.showOrder &&
                <Modal onClose={() => setState({...state, showOrder: false})}>
                    <OrderDetails order='034536'/>
                </Modal> }
            </div>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(
        {
            calories: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            __v: PropTypes.number.isRequired,
            _id: PropTypes.string.isRequired,
        }
    )).isRequired
}