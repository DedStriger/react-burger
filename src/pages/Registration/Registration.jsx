import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import setUser from '../../service/actions/setUser'
import style from '../../styles/oneScreenForm.module.css'
import { LOGIN_URL } from '../../utils/urls'

export default function Registration(){
    const [value, setValue] = useState({email: '', pass: '', name: ''});
    const dispatch = useDispatch();
    const history = useHistory();
    const onRegistrationPress = useCallback((e) => {
        e.prefentDefault()
        dispatch(setUser(value, () => history.replace({pathname: LOGIN_URL})))}, [value, dispatch, history])
    return(
        <div className={style.container}> 
            <form className={style.card} onSubmit={onRegistrationPress}> 
                <p className='pb-6 text text_type_main-medium'>Регистрация</p>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='text' 
                        placeholder='Имя' 
                        size='default' 
                        value={value.name} 
                        onChange={(e) => setValue({...value, name: e.target.value})}
                    />
                </div>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='email' 
                        placeholder='Email' 
                        size='default' 
                        value={value.email} 
                        onChange={(e) => setValue({...value, email: e.target.value})}
                    />
                </div>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='password' 
                        icon={'ShowIcon'}
                        placeholder='Пароль' 
                        value={value.pass}
                        onChange={(e) => setValue({...value, pass: e.target.value})}
                    />
                </div>
                <Button type="primary" size="medium">
                Зарегистрироваться
                </Button>
                <p className='text text_type_main-default mt-20'>Вспомнили пароль? <Link to={{pathname: LOGIN_URL}}>Войти</Link></p>
            </form>
        </div>
    )
}