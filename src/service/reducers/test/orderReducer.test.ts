import { GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS, HIDE_ORDER_MODAL, GET_ORDER_NUMBER_ERROR } from '../../actions/constant';
import { orderReducer } from "../orderReducer"

const initialState = {
    orderNumber: 0,
    orderNumberRequest: false,
    orderNumberError: false,
    orderShow: false
}

describe('order reducer', () => {
    it('should initial orderReducer', () => {
        expect(orderReducer(undefined, {type: '', number: ''})).toEqual(initialState)
    })

    it('should order number request', () => {
        expect(orderReducer(initialState, {type: GET_ORDER_NUMBER_REQUEST, number: ''})).toEqual(
            {
                ...initialState,
                orderNumberRequest: true,
            }
        )
    })

    it('should order number error', () => {
        expect(orderReducer({
            ...initialState,
            orderNumberRequest: true
        }, {type: GET_ORDER_NUMBER_ERROR, number: 0})).toEqual(
            {
                ...initialState,
                orderNumberError: true
            }
        )
    })

    it('should order number success', () => {
        expect(orderReducer({
            ...initialState,
            orderNumberRequest: true
        }, {type: GET_ORDER_NUMBER_SUCCESS, number: 12})).toEqual(
            {
                ...initialState,
                orderNumber: 12,
                orderShow: true
            }
        )
    })

    it('should hide order modal', () => {
        expect(orderReducer({
            ...initialState,
            orderNumber: 12,
            orderShow: true
        }, {type: HIDE_ORDER_MODAL, number: 0})).toEqual(initialState)
    })
})