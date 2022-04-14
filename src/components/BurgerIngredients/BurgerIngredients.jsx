import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import ingridientsStyle from './BurgerIngredients.module.css'
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import getIngridients from '../../service/actions/getIngridients';
import { DELETE_MODAL_INGRIDIENTS, GET_ON_MODAL_INGRIDIENTS } from '../../service/actions/constant';
import { useDrag } from 'react-dnd';

export default function BurgerIngredients() {
    const dispatch = useDispatch()

    const data = useSelector(store => store.ingridients.burgerIngridients)
    const modal = useSelector(store => store.modals.activeModal)

    useEffect(() => {
        dispatch(getIngridients())
    }, [dispatch])
    const [state, setState] = useState({showDetails: false,  current: 'bun'})
    const MemoDetailsModal = useCallback(() =>
    (<Modal  title='Детали ингредиента' onClose={() => {
        setState({...state, showDetails: false}); 
        dispatch({type: DELETE_MODAL_INGRIDIENTS})
        }}>
        {state.showDetails ? <IngredientDetails {...modal} /> : <div></div>}
    </Modal>), [state])

    const handleTabCLick = (type) => {
        window.location.hash= `#${type}`
        setState({...state, current: type});
    }

    

    return (
        <div className={ingridientsStyle.container}>
            <div className={ingridientsStyle.tabs}>
                <Tab value='bun' onClick={() => handleTabCLick('bun')} active={state.current === 'bun'}>Булки</Tab>
                <Tab value='sauce' onClick={() => handleTabCLick('sauce')} active={state.current === 'sauce'}>Соусы</Tab>
                <Tab value='main' onClick={() => handleTabCLick('main')} active={state.current === 'main'}>Начинки</Tab>
            </div>
            <div className={ingridientsStyle.scroll_container}>
                <Section title='Булки' id='bun'>
                    {data.filter(item => item.type === 'bun').map(item => (
                        <SectionItem key={item._id} {...item} onClick={() => {setState({...state, showDetails: true}); dispatch({type: GET_ON_MODAL_INGRIDIENTS, item: item})}}/>
                    ))}
                </Section>
                <Section title='Соусы' id='sauce'>
                    {data.filter(item => item.type === 'sauce').map(item => (
                        <SectionItem key={item._id} {...item} onClick={() => {setState({...state, showDetails: true}); dispatch({type: GET_ON_MODAL_INGRIDIENTS, item: item})}}/>
                    ))}
                </Section>
                <Section title='Начинка' id='main'>
                    {data.filter(item => item.type === 'main').map(item => (
                        <SectionItem key={item._id} {...item} onClick={() => {setState({...state, showDetails: true}); dispatch({type: GET_ON_MODAL_INGRIDIENTS, item: item})}}/>
                    ))}
                </Section>
            </div>   
            {state.showDetails && <MemoDetailsModal/>}
        </div>
    )
}

const Section = (props) => (
    <div className={ingridientsStyle.section} id={props.id}>
        <p className='text text_type_main-medium mb-6'>{props.title}</p>
        <div className={ingridientsStyle.section_container}>
            {props.children}
        </div>
    </div>
)

const SectionItem = (props) => 
{   const id = props._id
    const [, dragRef] = useDrag({
        type: "icngidient",
        item: {id},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
   return (
        <div className={ingridientsStyle.item} onClick={props.onClick} ref={dragRef}>
            <img src={props.image_large} className={ingridientsStyle.item_image} alt='ingridient'/>
            <div className={ingridientsStyle.item_price + ' mt-1 mb-1'}>
                <span className='text text_type_digits-default mr-2'>{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={"text text_type_main-default " + ingridientsStyle.item_name}>{props.name}</p>
        </div>
    )
 }

Section.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

SectionItem.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired 
}