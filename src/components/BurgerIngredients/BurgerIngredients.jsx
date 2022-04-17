import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import ingridientsStyle from './BurgerIngredients.module.css'
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import getIngridients from '../../service/actions/getIngridients';
import { DELETE_MODAL_INGRIDIENTS, GET_ON_MODAL_INGRIDIENTS } from '../../service/actions/constant';
import { useDrag } from 'react-dnd';
import {ingridientType} from '../../utils/types'

export default function BurgerIngredients() {
    const dispatch = useDispatch()

    const data = useSelector(store => store.ingridients.burgerIngridients)
    const modal = useSelector(store => store.modals.activeModal)
    const order = useSelector(store => store.con.constructorList)
    const bun = useSelector(store => store.con.bun)

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
    </Modal>), [state, dispatch, modal])

    const handleTabCLick = (type) => {
        window.location.hash= `#${type}`
        setState({...state, current: type});
    }

    const handleIngridientClick = (item) => {setState({...state, showDetails: true}); 
    dispatch({type: GET_ON_MODAL_INGRIDIENTS, item: item})}

    const ref = useRef()

    const handleScroll = (type, e, section) => {
        if((section.getBoundingClientRect().top - ref.current.getBoundingClientRect().top) < 100){
        setState({...state, current: type})}
    }


    return (
        <div className={ingridientsStyle.container}>
            <div className={ingridientsStyle.tabs}>
                <Tab value='bun' onClick={() => handleTabCLick('bun')} active={state.current === 'bun'}>Булки</Tab>
                <Tab value='sauce' onClick={() => handleTabCLick('sauce')} active={state.current === 'sauce'}>Соусы</Tab>
                <Tab value='main' onClick={() => handleTabCLick('main')} active={state.current === 'main'}>Начинки</Tab>
            </div>
            <div className={ingridientsStyle.scroll_container} ref={ref}>
                <Section title='Булки' id='bun' scrollEffect={function(e){handleScroll('bun', e, this.querySelector('#bun'))}} container={ref}>
                    {data.filter(item => item.type === 'bun').map(item => (
                        <SectionItem 
                            key={item._id} 
                            count={bun === item ? 2: 0} 
                            {...item} 
                            onClick={() => handleIngridientClick(item)}/>
                    ))}
                </Section>
                <Section title='Соусы' id='sauce' scrollEffect={function(e){handleScroll('sauce', e, this.querySelector('#sauce'))}} container={ref}>
                    {data.filter(item => item.type === 'sauce').map(item => (
                        <SectionItem 
                            count={order.filter(itemOrder => itemOrder._id === item._id).length} 
                            key={item._id} 
                            {...item} 
                            onClick={() => handleIngridientClick(item)}/>
                    ))}
                </Section>
                <Section title='Начинка' id='main'  scrollEffect={function(e){handleScroll('main', e, this.querySelector('#main'))}} container={ref}>
                    {data.filter(item => item.type === 'main').map(item => (
                        <SectionItem 
                            key={item._id} 
                            count={order.filter(itemOrder => itemOrder._id === item._id).length} 
                            {...item} 
                            onClick={() => handleIngridientClick(item)}/>
                    ))}
                </Section>
            </div>   
            {state.showDetails && <MemoDetailsModal/>}
        </div>
    )
}

const Section = (props) => {
    useEffect(
        () =>{
            props.container?.current?.addEventListener('scroll', props.scrollEffect)
            return () => props.container?.current?.removeEventListener('scroll', props.scrollEffect)
        }, [props.container, props.scrollEffect]
    )
    return (
    <div className={ingridientsStyle.section} id={props.id}>
        <p className='text text_type_main-medium mb-6'>{props.title}</p>
        <div className={ingridientsStyle.section_container}>
            {props.children}
        </div>
    </div>
)}

const SectionItem = (props) => 
{   const id = props._id
    const [, dragRef] = useDrag({
        type: "ingridient",
        item: {id},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
   return (
        <div className={ingridientsStyle.item} onClick={props.onClick} ref={dragRef}>
            {props.count !== 0 && <div className={ingridientsStyle.count + ' text text_type_digits-default'}>{props.count}</div>}
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

ingridientType.onClick = PropTypes.func.isRequired
ingridientType.count = PropTypes.number
ingridientType.scrollEffect = PropTypes.func


SectionItem.propTypes = ingridientType