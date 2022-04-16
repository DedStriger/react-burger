import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useMemo, useCallback, useRef} from 'react'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import constructorStyles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import getOrderNumber from '../../service/actions/getOrderNumber'
import { DELETE_CONSTRUCTOR_ELEMENT, HIDE_ORDER_MODAL, RELOAD_CONSTRUCTOR_LIST } from '../../service/actions/constant'
import { useDrop, useDrag } from 'react-dnd'

export default function BurgerConstructor(props){
   
    const dispatch = useDispatch();

    const store = useSelector(store => store)
    const bun = store.con.bun ? store.con.bun : store.ingridients.burgerIngridients.filter(item => item.type === 'bun')[0]
    const order = useMemo(() => {
        let orderList = { 
            ingredients: [bun._id]
        } 
        store.con.constructorList.length > 0 && store.con.constructorList.forEach(item => orderList.ingredients.push(item._id))
        return orderList
    }, [store, bun._id])

    const price =  (bun.price * 2) + store.con.constructorList.reduce((acc, item) => acc + (item.price), 0)
        const [, dropTarget] = useDrop({
            accept: "ingridient",
            drop(itemId) {
                props.onDropHandler(itemId);
            },
        });
        const moveCard = useCallback((dragIndex, hoverIndex) => {
            const dragCard = store.con.constructorList[dragIndex];
            const newCards = [...store.con.constructorList]
            newCards.splice(dragIndex, 1)
            newCards.splice(hoverIndex, 0, dragCard)
            dispatch({
              type: RELOAD_CONSTRUCTOR_LIST,
              array: newCards,
            })
          }, [store, dispatch]);
    return (
        <div>
        <div className={constructorStyles.element} ref={dropTarget}>
                <ConstructorElement type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_large}/>
                     <div className={constructorStyles.scroll_container}>
                        {
                            store.con.constructorList.length > 0 && store.con.constructorList.map((_, index) => 
                             (<IngridientItem item={_} index={index} dispatch={dispatch} key={_._id + index} moveCard={moveCard} />))
                        }
                       
                    </div>
                    <ConstructorElement type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_large}/>
            </div>
             <div className={constructorStyles.footer + ' mt-10'}>
                <p className='mr-10'>
                    <span className='text text_type_digits-medium mr-2'>{price}</span>
                    <span className={constructorStyles.icon}><CurrencyIcon type='primary'/></span>
                </p>
                <Button type="primary" size="medium" onClick={() => dispatch(getOrderNumber(order))}>
                    Оформить заказ
                </Button>
            </div>
            { store.order.orderShow &&
                <Modal onClose={() => dispatch({type: HIDE_ORDER_MODAL})}>
                    <OrderDetails order={`${store.order.orderNumber}`}/>
                </Modal> }
            </div>
    )
}

const IngridientItem = ({item, index, dispatch, moveCard}) => {
    const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();
    return (
        <div className={constructorStyles.item} ref={ref}
        style={{ opacity }}
        onDrop={preventDefault}
        data-handler-id={handlerId}>
            <DragIcon className='mr-2' type='primary'/>
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                handleClose={() => dispatch({type: DELETE_CONSTRUCTOR_ELEMENT, index: index})}
                thumbnail={item.image_large}/>
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
    onDropHandler: PropTypes.func.isRequired
}