import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import constructorStyles from './BurgerConstructor.module.css'

export default function BurgerConstructor(){
    return (
        <div className='pt-25'>
            <div className={constructorStyles.scroll_container}>
                <ConstructorElement type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                <ConstructorElement
                    isLocked={false}
                    text="Краторная булка N-200i (верх)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                <ConstructorElement
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                <ConstructorElement
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                <ConstructorElement
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                <ConstructorElement
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                <ConstructorElement
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
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