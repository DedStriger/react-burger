import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import constructorStyles from './BurgerConstructor.module.css'

export default function BurgerConstructor(){
    return (
        <div>
        <div className={constructorStyles.element}>
                <ConstructorElement type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                     <div className={constructorStyles.scroll_container}>
                        {
                            new Array(6).fill(0).map((_, index) => 
                                <div className={constructorStyles.item} key={index}>
                            <DragIcon className='mr-2' type='primary'/>
                            <ConstructorElement
                                isLocked={false}
                                text="Говяжий метеорит (отбивная)"
                                price={3000}
                                thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}/>
                        </div>)
                        }
                       
                    </div>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
            </div>
             <div className={constructorStyles.footer + ' mt-10'}>
                <p className='mr-10'>
                    <span className='text text_type_digits-medium mr-2'>610</span>
                    <CurrencyIcon type='primary'/>
                </p>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
            </div>
    )
}