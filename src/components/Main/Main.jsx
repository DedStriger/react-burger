import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_BUN, UPDATE_CONSTRUCTOR_LIST } from '../../service/actions/constant'
import getIngridients from '../../service/actions/getIngridients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import mainStyles from './Main.module.css'

export default function Main(){

    const dispatch = useDispatch()

    const {burgerIngridients} = useSelector(store => store.ingridients)

    useEffect(() => {
        dispatch(getIngridients())
    }, [dispatch])

    
    const handleDrop = (itemId) => {
        let item = burgerIngridients.filter(item => item._id === itemId.id)[0] 
        item.type === 'bun' ? dispatch({type: UPDATE_BUN, item: item}) : dispatch({type: UPDATE_CONSTRUCTOR_LIST, item: item})
    }
    return(
        <main>
            <div className={mainStyles.container}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
               
               {burgerIngridients.length !== 0 && <div className={mainStyles.content}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor onDropHandler={handleDrop}/>
                    </DndProvider>
                </div>}
            </div>
        </main>
    )
}