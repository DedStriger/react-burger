import React from 'react'
import PropTypes from 'prop-types';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngridients from '../BurgerIngredients/BurgerIngridients'
import mainStyles from './Main.module.css'

export default function Main(props){


    return(
        <main>
            <div className={mainStyles.container}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
               {props.data.length !== 0 && <div className={mainStyles.content}>
                    <BurgerIngridients data={props.data}/>
                    <BurgerConstructor/>
                </div>}
            </div>
        </main>
    )
}

Main.propTypes = {
    data: PropTypes.array.isRequired
}