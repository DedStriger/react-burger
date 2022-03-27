import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import AppHeaderButton from '../AppHeaderButton/AppHeaderButton';
import headerStyles from './AppHeader.module.css'

export default function AppHeader(){
    return(
        <header className={headerStyles.header}>
            <div className={headerStyles.container}>
                <div className={headerStyles.menu}>
                    <AppHeaderButton title='Конструктор' icon={<BurgerIcon type='primary'/>} color='#fff' />
                    <AppHeaderButton title='Лента заказов' icon={<ListIcon type='secondary'/>} color='#8585AD' />
                </div>
                <Logo/>
                <div className={headerStyles.profile}>
                        <AppHeaderButton title='Личный кабинет' icon={<ProfileIcon type='secondary' />} color='#8585AD' />
                </div>
            </div>
        </header>
    )
}