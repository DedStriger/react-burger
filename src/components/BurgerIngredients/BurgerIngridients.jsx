import React, { memo, useState } from 'react'
import PropTypes from 'prop-types';
import ingridientsStyle from './BurgerIngridients.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modals from '../Modals/Modals';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

export default function BurgerIngridients(props) {
    const [state, setState] = useState({data: {}, showDetails: false,  current: 'bun'})
    const dataApp = props.data
   
    const MemoDetailsModal = memo(() =>
    (<Modals  title='Детали ингредиента' show={state.showDetails}>
        {state.showDetails ? <IngredientDetails {...state.data} /> : <div></div>}
    </Modals>), [state.showDetails])

    return (
        <div className={ingridientsStyle.container}>
            <div className={ingridientsStyle.tabs}>
                <a href='#bun' onClick={() => setState({...state, showDetails: false, current: 'bun'})} className={state.current === 'bun' ? ingridientsStyle.tab + ' text text_type_main-default ' + ingridientsStyle.tab_active : ingridientsStyle.tab + ' text text_type_main-default' }>Булки</a>
                <a href='#sauce' onClick={() => setState({...state, showDetails: false, current: 'main'})} className={state.current === 'main' ? ingridientsStyle.tab + ' text text_type_main-default ' + ingridientsStyle.tab_active : ingridientsStyle.tab + ' text text_type_main-default'}>Соусы</a>
                <a href='#main' onClick={() => setState({...state, showDetails: false, current: 'sauce'})} className={state.current === 'sauce' ? ingridientsStyle.tab + ' text text_type_main-default ' + ingridientsStyle.tab_active : ingridientsStyle.tab + ' text text_type_main-default'}>Начинки</a>
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
            <MemoDetailsModal/>
        </div>
    )
}

const Section = (props) => (
    <div className={ingridientsStyle.section} id={props.id}>
        <p className='text text_type_main-large mb-6'>{props.title}</p>
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
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number,
    onClick: PropTypes.func
}

BurgerIngridients.propTypes = {
    data: PropTypes.array.isRequired
}