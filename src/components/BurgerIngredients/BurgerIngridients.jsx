import React, { useState } from 'react'
import PropTypes from 'prop-types';
import ingridientsStyle from './BurgerIngridients.module.css'
import data from '../../utils/data';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerIngridients() {
    const [current, setCurrent] = useState('bun')
    const dataApp = data()

    return (
        <div className={ingridientsStyle.container}>
            <div className={ingridientsStyle.tabs}>
                <a href='#bun' onClick={() => setCurrent('bun')} className={current === 'bun' ? ingridientsStyle.tab + ' text text_type_main-default ' + ingridientsStyle.tab_active : ingridientsStyle.tab + ' text text_type_main-default' }>Булки</a>
                <a href='#sauce' onClick={() => setCurrent('main')} className={current === 'main' ? ingridientsStyle.tab + ' text text_type_main-default ' + ingridientsStyle.tab_active : ingridientsStyle.tab + ' text text_type_main-default'}>Соусы</a>
                <a href='#main' onClick={() => setCurrent('sauce')} className={current === 'sauce' ? ingridientsStyle.tab + ' text text_type_main-default ' + ingridientsStyle.tab_active : ingridientsStyle.tab + ' text text_type_main-default'}>Начинки</a>
            </div>
            <div className={ingridientsStyle.scroll_container}>
                <Section title='Булки' id='bun'>
                    {dataApp.filter(item => item.type === 'bun').map(item => (
                        <SectionItem {...item}/>
                    ))}
                </Section>
                <Section title='Соусы' id='sauce'>
                    {dataApp.filter(item => item.type === 'sauce').map(item => (
                        <SectionItem {...item}/>
                    ))}
                </Section>
                <Section title='Начинка' id='main'>
                    {dataApp.filter(item => item.type === 'main').map(item => (
                        <SectionItem {...item}/>
                    ))}
                </Section>
            </div>   
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
    <div className={ingridientsStyle.item}>
        <img src={props.image_large} className={ingridientsStyle.item_image}/>
        <div className={ingridientsStyle.item_price + ' mt-1 mb-1'}>
            <span className='text text_type_digits-default mr-2'>{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
        <p className={"text text_type_main-default " + ingridientsStyle.item_name}>{props.name}</p>
    </div>
)

SectionItem.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
}
