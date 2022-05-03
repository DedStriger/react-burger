import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useCallback, useState } from 'react'
import { FORGOT_URL, REGISTRATION_URL } from '../../utils/urls'
import style from '../../styles/oneScreenForm.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import signIn from '../../service/actions/signIn'

export default function Login(){
    const [value, setValue] = useState({email: '', pass: ''})
    const dispatch = useDispatch();
    const history = useHistory()
    const login = useCallback((e) => {
        e.preventDefault()
        console.log(value)
        dispatch(signIn(value, history))
    }, [dispatch, history, value])

    return(
        <div className={style.container}> 
            <form className={style.card} onSubmit={login}> 
                <p className='pb-6 text text_type_main-medium'>Вход</p>
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
                    Войти
                </Button>
                <p className='text text_type_main-default mt-20'>Вы — новый пользователь? <Link to={{pathname: REGISTRATION_URL}}>Зарегистрироваться</Link></p>
                <p className='text text_type_main-default mt-4'>Забыли пароль? <Link to={{pathname: FORGOT_URL}}>Восстановить пароль</Link></p>
            </form>
        </div>
    )
}