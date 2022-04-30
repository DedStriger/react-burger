import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useCallback, useState } from 'react'
import { LOGIN_URL } from '../../utils/urls'
import style from '../../styles/oneScreenForm.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import resetPass from '../../service/actions/resetPass'

export default function Reset(){
    const [value, setValue] = useState({code: '', pass: ''})
    const refresh = useSelector(store => store.refresh)
    const dispatch = useDispatch()
    const reset = useCallback(() => dispatch(resetPass(value)),[value, dispatch])
    return(
        <div className={style.container}> 
            <div className={style.card}> 
                <p className='pb-6 text text_type_main-medium'>{refresh.passResetSuccess ? 'Успех!' : 'Восстановить'}</p>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='password' 
                        icon={'ShowIcon'}
                        placeholder='Введите новый пароль' 
                        value={value.pass}
                        onChange={(e) => setValue({...value, pass: e.target.value})}
                    />
                </div>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='text' 
                        placeholder='Введите код из письма' 
                        size='default' 
                        value={value.code} 
                        onChange={(e) => setValue({...value, code: e.target.value})}
                    />
                </div>
                <Button onClick={reset} type="primary" size="medium" disabled={refresh.passResetRequest}>
                    {refresh.passResetRequest ? 'Запрос...' : 'Сохранить'}
                </Button>
                <p className='text text_type_main-default mt-20'>Вспомнили пароль? <Link to={{pathname: LOGIN_URL}}>Войти</Link></p>
            </div>
        </div>
    )
}