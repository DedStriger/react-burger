import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getIngridients from '../../service/actions/getIngridients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import mainStyles from './Main.module.css'

export default function Main(){

    const dispatch = useDispatch()

    const {burgerIngridients} = useSelector(store => store.ingridients)

    useEffect(() => {
        dispatch(getIngridients())
    }, [])
    const bun =  burgerIngridients.filter(item => item.type === 'bun')
    const constructorData = burgerIngridients.filter(item => item.type !== 'bun')
    return(
        <main>
            <div className={mainStyles.container}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
               {burgerIngridients.length !== 0 && <div className={mainStyles.content}>
                    <BurgerIngredients/>
                    <BurgerConstructor data={constructorData} bun={bun[0]}/>
                </div>}
            </div>
        </main>
    )
}