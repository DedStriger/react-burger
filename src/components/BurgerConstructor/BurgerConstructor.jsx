import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import constructorStyles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import getOrderNumber from '../../service/actions/getOrderNumber'
import { HIDE_ORDER_MODAL } from '../../service/actions/constant'

export default function BurgerConstructor(props){
   
    const dispatch = useDispatch();
    const order = { 
        ingredients: []
    } 
    props.data.forEach(item => order.ingredients.push(item._id))

    const {orderNumber, orderShow} = useSelector(store => store.order)
    return (
        <div>
        <div className={constructorStyles.element}>
                <ConstructorElement type="top"
                    isLocked={true}
                    text={`${props.bun.name} (верх)`}
                    price={props.bun.price}
                    thumbnail={props.bun.image_large}/>
                     <div className={constructorStyles.scroll_container}>
                        {
                            props.data.map(_ => 
                             ( <div className={constructorStyles.item} key={_._id}>
                                    <DragIcon className='mr-2' type='primary'/>
                                    <ConstructorElement
                                        isLocked={false}
                                        text={_.name}
                                        price={_.price}
                                        thumbnail={_.image_large}/>
                                </div>))
                        }
                       
                    </div>
                    <ConstructorElement type="bottom"
                    isLocked={true}
                    text={`${props.bun.name} (низ)`}
                    price={props.bun.price}
                    thumbnail={props.bun.image_large}/>
            </div>
             <div className={constructorStyles.footer + ' mt-10'}>
                <p className='mr-10'>
                    <span className='text text_type_digits-medium mr-2'>{(props.bun.price * 2) + props.data.reduce((acc, item) => acc + item.price, 0)}</span>
                    <span className={constructorStyles.icon}><CurrencyIcon type='primary'/></span>
                </p>
                <Button type="primary" size="medium" onClick={() => dispatch(getOrderNumber(order))}>
                    Оформить заказ
                </Button>
            </div>
            { orderShow &&
                <Modal onClose={() => dispatch({type: HIDE_ORDER_MODAL})}>
                    <OrderDetails order={`${orderNumber}`}/>
                </Modal> }
            </div>
    )
}

export const Item = PropTypes.shape(  {
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
})

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(Item).isRequired,
    bun: Item.isRequired
}