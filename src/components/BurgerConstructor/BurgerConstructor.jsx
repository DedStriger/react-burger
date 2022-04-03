import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useReducer} from 'react'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import constructorStyles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types'

export default function BurgerConstructor(props){
    const initialState = {
        showOrder: false, 
        price: (props.bun.price * 2) + props.data.reduce((acc, item) => acc + item.price, 0),
        orderNumber: ''
    }

    const order = { 
        ingredients: []
    } 
    props.data.forEach(item => order.ingredients.push(item._id))

    const reducer = (state, action) => {
        switch(action.type){
            case 'show' : 
                return {...state, showOrder: true };
            case 'hide' :
                return {...state, showOrder: false, orderNumber: '' };
            case 'setOrderNumber' : {
                return {...state, orderNumber: action.payload};
            }
            default: 
                return {...state};
        }
    }



    const handleOrder = async () => {
        await fetch('https://norma.nomoreparties.space/api/orders', 
        {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(order)
        })
        .then(resp => resp.ok ? resp.json() : Promise.reject(resp.status))
        .then(data => dispatch({type: 'setOrderNumber', payload: data.order.number}))
        .catch(err => console.log(err))
        dispatch({type: 'show'})
    }

    const [state, dispatch] = useReducer(reducer, initialState)
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
                    <span className='text text_type_digits-medium mr-2'>{state.price}</span>
                    <span className={constructorStyles.icon}><CurrencyIcon type='primary'/></span>
                </p>
                <Button type="primary" size="medium" onClick={handleOrder}>
                    Оформить заказ
                </Button>
            </div>
            { state.showOrder &&
                <Modal onClose={() => dispatch({type: 'hide'})}>
                    <OrderDetails order={`${state.orderNumber}`}/>
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