import React, { memo, useCallback, useState } from 'react'
import PropTypes from 'prop-types';
import ingridientsStyle from './BurgerIngredients.module.css'
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

export default function BurgerIngredients(props) {
    const [state, setState] = useState({data: {}, showDetails: false,  current: 'bun'})
    const dataApp = props.data
    const MemoDetailsModal = useCallback(() =>
    (<Modal  title='Детали ингредиента' onClose={() => setState({...state, showDetails: false})}>
        {state.showDetails ? <IngredientDetails {...state.data} /> : <div></div>}
    </Modal>), [state.showDetails, state.data])

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
                    {dataApp.filter(item => item.type === 'bun').map(item => (
                        <SectionItem key={item._id} {...item} onClick={() => setState({...state, showDetails: true, data: {...item}})}/>
                    ))}
                </Section>
                <Section title='Соусы' id='sauce'>
                    {dataApp.filter(item => item.type === 'sauce').map(item => (
                        <SectionItem key={item._id} {...item} onClick={() => setState({...state, showDetails: true, data: {...item}})}/>
                    ))}
                </Section>
                <Section title='Начинка' id='main'>
                    {dataApp.filter(item => item.type === 'main').map(item => (
                        <SectionItem key={item._id} {...item} onClick={() => setState({...state, showDetails: true, data: {...item}})}/>
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

const SectionItem = (props) => (
    <div className={ingridientsStyle.item} onClick={props.onClick}>
        <img src={props.image_large} className={ingridientsStyle.item_image} alt='ingridient'/>
        <div className={ingridientsStyle.item_price + ' mt-1 mb-1'}>
            <span className='text text_type_digits-default mr-2'>{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
        <p className={"text text_type_main-default " + ingridientsStyle.item_name}>{props.name}</p>
    </div>
)

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

BurgerIngredients.propTypes = {
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