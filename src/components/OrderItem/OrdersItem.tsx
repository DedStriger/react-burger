import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useCallback} from 'react'
import { useSelector } from 'react-redux';
import { storeType, ingridientType } from '../../utils/types';
import styles from './OrderItems.module.css'
import { useMemo } from 'react';
import sum from '../../utils/sum';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { LENTA_URL } from '../../utils/urls';

export type OrdersItemProps = {
    _id: number | string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    ingredients: string[];
}

export default function OrdersItem ({_id, status, createdAt, name, number, ingredients} : OrdersItemProps){
    const ingredientsStore = useSelector((store: storeType) => store.ingridients)

    let activeingredient = useMemo(() => {
        const arr: Array<ingridientType & {count: number}> = [] 
        sum(ingredients).map(item => {
            const answ = {
                ...ingredientsStore.burgerIngridients.filter(itemInner => itemInner._id === item[0])[0],
                count: item[1]
            }
            arr.push(answ)
        })
        return arr
    }, [ingredients])

    const history = useHistory()
    const location = useLocation()
    const goToPage = useCallback(() => {
        history.replace({pathname: LENTA_URL+`/${number}`, state: {orderBg: location}})
    }, [number])

    return(
        <Link className={styles.container} to={{pathname: LENTA_URL+`/${number}`, state: {orderBg: location}}}>
            <div className={styles.row + ' mb-6'}>
                <p className='text text_type_digits-default'>#{number}</p>
                <p className='text text_type_main-default text_color_inactive'>{new Date(createdAt).toUTCString()}</p>
            </div>
            <p className="text text_type_main-medium mb-2">
                {name}
            </p>
            <p className="text text_type_main-small mb-6">
                {status}
            </p>
            <div className={styles.row}>
                <div className={styles.imgContainer}>
                {
                    activeingredient.map((item, index) => {
                        if( item.count > 1){
                            return (
                            <div key={index} className={styles.withNumber}>
                                 <img 
                                    src={item.image_mobile} 
                                    className={styles.img}
                                />
                                <span className='text text_type_main-small'>+{item.count}</span>
                            </div>)
                        } else {
                            return (
                                <img 
                                    key={index}
                                    src={item.image_mobile} 
                                    className={styles.img}
                                />
                            )
                        }
                        }
                    )
                }
                </div>
                <div className={styles.innerContainer}>
                <p className="text text_type_digits-default mr-2">
                    {
                        activeingredient.reduce((acc, item) => acc += item.price, 0) 
                    }    
                </p><CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}