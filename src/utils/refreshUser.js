import { SET_USER_SUCCESS } from "../service/actions/constant";
import { baseUrl } from "./apiUrl";
import checkResponse from "./checkResponse";
import { getCookie } from "./getCookie";
import { setCookie } from "./setCookie";


export default async function refreshUser(dispatch, user) {
    const apiUrl = baseUrl + '/auth/user'
    await fetch(apiUrl, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('authToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(user ? {
                "token": `${getCookie('refToken')}`,
                "email": user.email,
                "name": user.name,
                "password": user.pass
            } : {
                "token": `${getCookie('refToken')}`,
            })
        }).then(res => checkResponse(res))
        .then(data => {
            let authToken = data.accessToken
            let refToken = data.refreshToken
            if (authToken && refToken) {
                setCookie('authToken', authToken);
                setCookie('refToken', refToken);
            }
            dispatch({ type: SET_USER_SUCCESS, email: data.user.email, name: data.user.name });
        }).catch((e) => console.log(e))
}