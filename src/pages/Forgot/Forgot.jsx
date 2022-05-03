import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import refresh from "../../service/actions/refresh";
import style from '../../styles/oneScreenForm.module.css'
import { LOGIN_URL } from "../../utils/urls";

export default function Forgot(){
    const [email, setEmail] = useState('')
    const history = useHistory()
    const refreshState = useSelector(store => store.refresh)
    const dispatch = useDispatch()
    const reset = useCallback((e) => {
        e.preventDefault()
        dispatch(refresh(email, history))}, [dispatch, history, email])
        
    return(
        <div className={style.container}> 
            <form className={style.card} onSubmit={reset}> 
                <p className='pb-6 text text_type_main-medium'>Восстановление пароля</p>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='email' 
                        placeholder='Укажите e-mail' 
                        size='default' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button type="primary" disabled={refreshState.request || refreshState.error} size="medium" >
                    {refreshState.request ? 'Запрос...' : refreshState.error ? 'email не найден' : 'Востановить'}
                </Button>
                <p className='text text_type_main-default mt-20'>Вспомнили пароль? <Link to={{pathname: LOGIN_URL}}>Войти</Link></p>
            </form>
        </div>
    )
}