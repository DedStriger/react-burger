import { GEt_BURGER_INGRIDIENTS_ERROR, GEt_BURGER_INGRIDIENTS_SUCCESS, GEt_BURGER_INGRIDIENTS__REQUEST } from "./constant"

export default function getIngridients() {
    const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'
    return function(dispatch) {

        dispatch({ type: GEt_BURGER_INGRIDIENTS__REQUEST })
        fetch(apiUrl)
            .then(
                (resp) => {
                    if (resp.ok) {
                        return resp.json();
                    }
                    return Promise.reject(resp.status);
                }
            )
            .then(data => dispatch({ type: GEt_BURGER_INGRIDIENTS_SUCCESS, ingridients: data.data }))
            .catch((err) => dispatch({ type: GEt_BURGER_INGRIDIENTS_ERROR }));
    }
}