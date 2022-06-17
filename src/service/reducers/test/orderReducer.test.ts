import { GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS, HIDE_ORDER_MODAL, GET_ORDER_NUMBER_ERROR } from '../../actions/constant';
import { orderReducer } from "../orderReducer"

describe('order reducer', () => {
    it('should initial orderReducer', () => {
        expect(orderReducer(undefined, {type: '', number: ''})).toEqual(
            {
                orderNumber: 0,
                orderNumberRequest: false,
                orderNumberError: false,
                orderShow: false
            }
        )
    })

    it('should order number request', () => {
        expect(orderReducer({
            orderNumber: 0,
            orderNumberRequest: false,
            orderNumberError: false,
            orderShow: false
        }, {type: GET_ORDER_NUMBER_REQUEST, number: ''})).toEqual(
            {
                orderNumber: 0,
                orderNumberRequest: true,
                orderNumberError: false,
                orderShow: false
            }
        )
    })

    it('should order number error', () => {
        expect(orderReducer({
            orderNumber: 0,
            orderNumberRequest: true,
            orderNumberError: false,
            orderShow: false
        }, {type: GET_ORDER_NUMBER_ERROR, number: 0})).toEqual(
            {
                orderNumber: 0,
                orderNumberRequest: false,
                orderNumberError: true,
                orderShow: false
            }
        )
    })

    it('should order number success', () => {
        expect(orderReducer({
            orderNumber: 0,
            orderNumberRequest: true,
            orderNumberError: false,
            orderShow: false
        }, {type: GET_ORDER_NUMBER_SUCCESS, number: 12})).toEqual(
            {
                orderNumber: 12,
                orderNumberRequest: false,
                orderNumberError: false,
                orderShow: true
            }
        )
    })

    it('should hide order modal', () => {
        expect(orderReducer({
            orderNumber: 12,
            orderNumberRequest: false,
            orderNumberError: false,
            orderShow: true
        }, {type: HIDE_ORDER_MODAL, number: 0})).toEqual(
            {
                orderNumber: 0,
                orderNumberRequest: false,
                orderNumberError: false,
                orderShow: false
            }
        )
    })
})