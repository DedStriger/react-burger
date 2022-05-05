
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import signOut from "../../service/actions/signOut";
import { PROFILE_URL, ORDERS_URL } from "../../utils/urls";
import style from './Profile.module.css'

export default function ProfileContainer({children}){
    const history = useHistory();
    const dispatch = useDispatch()
    const logout = useCallback(() => dispatch(signOut(history)), [dispatch, history])
    return(
        <div className={style.container}>
            <div className={style.sidebar + ' pr-15'}>
                <NavLink exact to={{pathname: PROFILE_URL}} className={`text text_type_main-medium ${style.chat}`} activeClassName={style.active}>
                    Профиль
                </NavLink>
                <NavLink exact to={{pathname: ORDERS_URL}} className={`text text_type_main-medium ${style.chat}`} activeClassName={style.active}>
                    История заказов
                </NavLink>
                <div className={`text text_type_main-medium ${style.chat}`} onClick={logout}>
                    Выйти
                </div>
            </div>
            <div className={style.card}>
                {children}
            </div>
        </div>
    )
}