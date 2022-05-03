import React from 'react'
import detailsStyles from './IngredientDetails.module.css'
import PropTypes from 'prop-types';

export default function IngredientDetails(props){
    return(
        <div className={detailsStyles.container}>
            <img src={props.image_large} alt="img" />
            <h2 className="text text_type_main-medium mt-4">{props.name}</h2>
            <div className={detailsStyles.info}>
                <Item title='Калории,ккал' number={props.calories}/>
                <Item title='Белки, г' number={props.proteins}/>
                <Item title='Жиры, г' number={props.fat}/>
                <Item title='Углеводы, г' number={props.carbohydrates}/>
            </div>
        </div>
    )
}


const Item = (props) => 
    <div className={detailsStyles.item}>
        <p className="text text_type_main-default">{props.title}</p>
        <p className='text text_type_digits-default mt-2'>{props.number}</p>
    </div>


Item.propTypes = {
    title: PropTypes.string,
    number: PropTypes.number
}

IngredientDetails.propTypes = {
    name: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    image_large: PropTypes.string,
}