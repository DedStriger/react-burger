import { combineReducers } from "redux";
import { burgerReducer } from "./burgerReducer";
import modalReducer from "./modalReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
    ingridients: burgerReducer,
    modals: modalReducer,
    order: orderReducer
})