import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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
                    <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor data={constructorData} bun={bun[0]}/>
                      </DndProvider>
                </div>}
            </div>
        </main>
    )
}