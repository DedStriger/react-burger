import { DELETE_MODAL_INGRIDIENTS, GET_ON_MODAL_INGRIDIENTS } from "../../actions/constant";
import modalReducer from "../modalReducer";
import { testIngredient } from '../../../utils/testIngredient';

const initialState = {
    activeModal: {}
}

describe('modal reducer', () => {
    it('should initial modal reducer', () => {
        expect(modalReducer(undefined, {type: ''})).toEqual(initialState)
    })

    it('shoud get modal ingredient', () => {
        expect(modalReducer(initialState, {type: GET_ON_MODAL_INGRIDIENTS, item: testIngredient})).toEqual(
            {
                activeModal: testIngredient
            }
        )
    })

    it('should delete ingridient', () => {
        expect(modalReducer({activeModal: testIngredient}, {type: DELETE_MODAL_INGRIDIENTS})).toEqual(initialState)
    })
})