import { baseUrl } from "../../utils/apiUrl";
import checkResponse from "../../utils/checkResponse";
import { deleteCookie } from "../../utils/deleteCookie";
import { getCookie } from "../../utils/getCookie";
import { LOGIN_URL } from "../../utils/urls";
import { LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from "./constant";
import {History} from 'history'
import { AppThunk } from '../../index';

export default function signOut(history: History<unknown>) {
    const apiUrl = baseUrl + '/auth/logout'
    return async function(dispatch : AppThunk) {
        dispatch({ type: LOGOUT_USER_REQUEST })
        await fetch(apiUrl, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "token": `${getCookie('refToken')}`,
                })
            })
            .then(res => checkResponse(res))
            .then(data => {
                deleteCookie('refToken')
                deleteCookie('authToken')
                dispatch({ type: LOGOUT_USER_SUCCESS, check: data.success })
                history.replace({ pathname: LOGIN_URL })
            })
            .catch(() => dispatch({ type: LOGOUT_USER_ERROR }))
    }
}