import { baseUrl } from "./apiUrl";
import checkResponse from "./checkResponse";
import { getCookie } from "./getCookie";
import { SET_USER_SUCCESS } from "../service/actions/constant";
import refreshUser from "./refreshUser";

export default async function checkUser(dispatch) {
    const apiUrl = baseUrl + '/auth/user'
    await fetch(apiUrl, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('authToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }).then(
            (resp) =>
            checkResponse(resp)

        ).then(data => {
            dispatch({ type: SET_USER_SUCCESS, email: data.user.email, name: data.user.name });
        })
        .catch((e) => { e === 'jwt expired' ? refreshUser(dispatch) : console.log(e) })
}