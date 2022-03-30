import React from 'react'
import PropTypes from 'prop-types';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import mainStyles from './Main.module.css'

export default function Main(props){


    return(
        <main>
            <div className={mainStyles.container}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
               {props.data.length !== 0 && <div className={mainStyles.content}>
                    <BurgerIngredients data={props.data}/>
                    <BurgerConstructor data={props.data}/>
                </div>}
            </div>
        </main>
    )
}

Main.propTypes = {
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