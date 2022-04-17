import { baseUrl } from "../../utils/apiUrl"
import { GET_ORDER_NUMBER_ERROR, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS } from "./constant"

export default function getOrderNumber(order) {
    const apiUrl = `${baseUrl}/orders`
    return function(dispatch) {
        dispatch({ type: GET_ORDER_NUMBER_REQUEST })
        fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(order)
            })
            .then(resp => resp.ok ? resp.json() : Promise.reject(resp.status))
            .then(data => dispatch({ type: GET_ORDER_NUMBER_SUCCESS, number: data.order.number }))
            .catch(err => dispatch({ type: GET_ORDER_NUMBER_ERROR }))
    }
}