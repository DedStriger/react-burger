import React, { useContext } from 'react'
import { GlobalData } from '../../service/GlobalData'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import mainStyles from './Main.module.css'

export default function Main(){

    const data = useContext(GlobalData)
    const bun = data.filter(item => item.type === 'bun')
    const constructorData = data.filter(item => item.type !== 'bun')
    return(
        <main>
            <div className={mainStyles.container}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
               {data.length !== 0 && <div className={mainStyles.content}>
                    <BurgerIngredients/>
                    <BurgerConstructor data={constructorData} bun={bun[0]}/>
                </div>}
            </div>
        </main>
    )
}