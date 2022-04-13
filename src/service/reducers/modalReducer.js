import { DELETE_MODAL_INGRIDIENTS, GET_ON_MODAL_INGRIDIENTS } from "../actions/constant";

const initialState = {
    activeModal: {}
}

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ON_MODAL_INGRIDIENTS:
            {
                return {
                    activeModal: action.item
                }
            }
        case DELETE_MODAL_INGRIDIENTS:
            {
                return {
                    activeModal: []
                }
            }
        default:
            return state;
    }
}