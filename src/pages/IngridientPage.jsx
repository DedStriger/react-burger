import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'
import AppHeader from '../components/AppHeader/AppHeader'
import IngredientDetails from '../components/IngredientDetails/IngredientDetails'
import getIngridients from '../service/actions/getIngridients';

export default function IngredientPage(){
    const ingredients = useSelector(store => store.ingridients.burgerIngridients)
    const match = useRouteMatch('/ingredients/:id');
    const dispatch = useDispatch()
    useEffect(() => dispatch(getIngridients())
    )
    return(
        <>
            <AppHeader/>
            <IngredientDetails {...ingredients.filter(item => item._id === match.params.id)[0]}/>
        </>
    )
}