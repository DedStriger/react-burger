import { baseUrl } from "../../utils/apiUrl";
import checkResponse from "../../utils/checkResponse";
import { PASS_REFRESH_ERROR, PASS_REFRESH_REQUEST, PASS_REFRESH_SUCCESS } from "./constant";

export default function resetPass(form) {
    const apiUrl = baseUrl + '/password-reset/reset'
    return async function(dispatch) {
        dispatch({ type: PASS_REFRESH_REQUEST })
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
                    "password": form.pass,
                    "token": form.code
                })
            })
            .then(
                (resp) =>
                checkResponse(resp)

            ).then(data => {
                dispatch({ type: PASS_REFRESH_SUCCESS, check: data.success });
            })
            .catch(() => dispatch({ type: PASS_REFRESH_ERROR }))
    }
}