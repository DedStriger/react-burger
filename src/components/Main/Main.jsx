import React from 'react'
import mainStyles from './Main.module.css'

export default function Main(){
    return(
        <main>
            <div className={mainStyles.container}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <div className={mainStyles.content}>
                </div>
            </div>
        </main>
    )
}