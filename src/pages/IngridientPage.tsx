import React from 'react'
import {useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'
import IngredientDetails from '../components/IngredientDetails/IngredientDetails'
import { ingridientType, ingridientsType } from '../utils/types';

export default function IngredientPage(){
    const ingredients : ingridientType[] = useSelector((store : {ingridients : ingridientsType}) => store.ingridients.burgerIngridients)
    const match = useRouteMatch<{id: string}>('/ingredients/:id');
    return(
            <IngredientDetails {...ingredients.filter((item: ingridientType) => item._id === match?.params?.id)[0]}/>
    )
}