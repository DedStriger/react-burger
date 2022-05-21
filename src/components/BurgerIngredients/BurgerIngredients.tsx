import React, {useEffect, useRef, useState } from 'react'
import ingridientsStyle from './BurgerIngredients.module.css'
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { INGRIDIENT_URL } from '../../utils/urls';
import { storeType, ingridientType } from '../../utils/types';
import { PropsWithChildren } from 'react';

export default function BurgerIngredients() {

    const data = useSelector((store: storeType) => store.ingridients.burgerIngridients)
    const order = useSelector((store: storeType) => store.con.constructorList)
    const bun = useSelector((store: storeType) => store.con.bun)
    const [state, setState] = useState({showDetails: false,  current: 'bun'})

    const handleTabCLick = (value : string) => {
        window.location.hash= `#${value}`
        setState({...state, current: value});
    }

    const handleIngridientClick = (item: ingridientType) => {setState({...state, showDetails: true}); 
    localStorage.setItem('id', item._id)}

    const ref = useRef<HTMLDivElement>(null)

    const handleScroll = (type: string, e: Event, section: HTMLDivElement) => {
        if(ref.current && (section.getBoundingClientRect().top -  ref.current.getBoundingClientRect().top) < 100){
        setState({...state, current: type})}
    }

    return (
        <div className={ingridientsStyle.container}>
            <div className={ingridientsStyle.tabs}>
                {/* Почемуто у меня показывает что нет свойства children у табов и кнопок из библиотек. Наставник сказал пока сделать так, он не понимает в чем дело, я тоже : ( */}
                {/*@ts-expect-error*/}
                <Tab value='bun' onClick={handleTabCLick} active={state.current === 'bun'}>Булки</Tab>
                {/*@ts-expect-error*/}
                <Tab value='sauce' onClick={handleTabCLick} active={state.current === 'sauce'}>Соусы</Tab>
                {/*@ts-expect-error*/}
                <Tab value='main' onClick={handleTabCLick} active={state.current === 'main'}>Начинки</Tab>
            </div>
            <div className={ingridientsStyle.scroll_container} ref={ref}>
                <Section title='Булки' id='bun' scrollEffect={function(e: Event){handleScroll('bun', e, this.querySelector('#bun'))}} container={ref}>
                    {data.filter((item: ingridientType) => item.type === 'bun').map((item: ingridientType)  => (
                        <SectionItem 
                            key={item._id} 
                            count={bun === item ? 2: 0} 
                            {...item} 
                            onClick={() => handleIngridientClick(item)}/>
                    ))}
                </Section>
                <Section title='Соусы' id='sauce' scrollEffect={function(e: Event){handleScroll('sauce', e, this.querySelector('#sauce'))}} container={ref}>
                    {data.filter((item: ingridientType)  => item.type === 'sauce').map((item: ingridientType)  => (
                        <SectionItem 
                            count={order.filter(itemOrder => itemOrder._id === item._id).length} 
                            key={item._id} 
                            {...item} 
                            onClick={() => handleIngridientClick(item)}/>
                    ))}
                </Section>
                <Section title='Начинка' id='main'  scrollEffect={function(e: Event){handleScroll('main', e, this.querySelector('#main'))}} container={ref}>
                    {data.filter((item: ingridientType)  => item.type === 'main').map((item: ingridientType)  => (
                        <SectionItem 
                            key={item._id} 
                            count={order.filter(itemOrder => itemOrder._id === item._id).length} 
                            {...item} 
                            onClick={() => handleIngridientClick(item)}/>
                    ))}
                </Section>
            </div>   
        </div>
    )
}

export type SectionType = PropsWithChildren<{
    id: string;
    title: string;
    container: React.RefObject<HTMLDivElement>;
    scrollEffect: (this: any, e: Event) => void;
}>

const Section = (props : SectionType) => {
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


const SectionItem = (props : ingridientType & {count: number; onClick: () => void;}) => 
{   const id = props._id
    const location = useLocation()
    const [, dragRef] = useDrag({
        type: "ingridient",
        item: {id},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
   return (
        <Link to={{pathname: INGRIDIENT_URL+props._id, state: {background: location}}} className={ingridientsStyle.item} onClick={props.onClick} ref={dragRef}>
            {props.count !== 0 && <div className={ingridientsStyle.count + ' text text_type_digits-default'}>{props.count}</div>}
            <img src={props.image_large} className={ingridientsStyle.item_image} alt='ingridient'/>
            <div className={ingridientsStyle.item_price + ' mt-1 mb-1'}>
                <span className='text text_type_digits-default mr-2'>{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={"text text_type_main-default " + ingridientsStyle.item_name}>{props.name}</p>
        </Link>
    )
 }

