import React from 'react'
import {useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'
import IngredientDetails from '../components/IngredientDetails/IngredientDetails'

export default function IngredientPage(){
    const ingredients = useSelector(store => store.ingridients.burgerIngridients)
    const match = useRouteMatch('/ingredients/:id');
    return(
            <IngredientDetails {...ingredients.filter(item => item._id === match.params.id)[0]}/>
    )
}