import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import refreshUser from "../../service/actions/refreshUser";
import style from './Profile.module.css'
import ProfileContainer from "./ProfileContainer";

export default function Profile(){
    const user = useSelector(store => store.user)
    const disaptch = useDispatch()
    const [value, setValue] = useState({name: user.name || '', login: user.login || '', pass: user.pass || ''})
    return(
        <ProfileContainer>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='text' 
                        placeholder='Имя' 
                        size='default' 
                        icon="EditIcon"
                        value={value.name} 
                        onChange={(e) => setValue({...value, name: e.target.value})}
                    />
                </div>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='text' 
                        placeholder='Логин' 
                        size='default' 
                        icon="EditIcon"
                        value={value.login} 
                        onChange={(e) => setValue({...value, login: e.target.value})}
                    />
                </div>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='password' 
                        placeholder='Пароль' 
                        size='default' 
                        icon="EditIcon"
                        value={value.pass} 
                        onChange={(e) => setValue({...value, pass: e.target.value})}
                    />
                </div>
                <Button type="primary" onClick={() => disaptch(refreshUser(value))} size="medium">
                    Сохранить
                </Button>
        </ProfileContainer>
    )
}