import { History } from "history";
import { baseUrl } from "../../utils/apiUrl";
import checkResponse from "../../utils/checkResponse";
import { RESET_URL } from "../../utils/urls";
import { REFRESH_ERROR, REFRESH_REQUEST, REFRESH_SUCCESS } from "./constant";
import { AppThunk } from '../../index';


export default function refresh(email: string, history : History<unknown>) {
    const apiUrl = baseUrl + '/password-reset'
    return async function(dispatch: AppThunk) {
        dispatch({ type: REFRESH_REQUEST })
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
                    "email": email,
                })
            })
            .then(res => checkResponse(res))
            .then(data => {
                dispatch({ type: REFRESH_SUCCESS, check: data.success });
                data.success && history.replace({ pathname: RESET_URL })
            })
            .catch(() => dispatch({ type: REFRESH_ERROR }))
    }
}