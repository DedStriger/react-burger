import { PASS_REFRESH_ERROR, PASS_REFRESH_REQUEST, PASS_REFRESH_SUCCESS, REFRESH_ERROR, REFRESH_REQUEST, REFRESH_SUCCESS } from '../../actions/constant';
import refreshReduser from "../refreshReduser"

const initialState = {
    checkEmail: false,
    request: false,
    error: false,
    passResetRequest: false,
    passResetError: false,
    passResetSuccess: false
}

describe('refresh reducer', () => {
    it('should initial', () => {
        expect(refreshReduser(undefined, {type: ''})).toEqual(initialState)
    })

    it('shuold refresh request', () => {
        expect(refreshReduser( initialState, {type: REFRESH_REQUEST})).toEqual(
                {
                    ...initialState,
                    request: true,
                }
            )
    })

    it('shuold refresh error', () => {
        expect(refreshReduser( initialState, {type: REFRESH_ERROR})).toEqual(
                {
                    ...initialState,
                    error: true
                }
            )
    })

    it('shuold refresh success', () => {
        expect(refreshReduser( initialState, {type: REFRESH_SUCCESS, check: true})).toEqual(
                {
                    ...initialState,
                    checkEmail: true,
                }
            )
    })

    it('shuold pass refresh request', () => {
        expect(refreshReduser(initialState, {type: PASS_REFRESH_REQUEST})).toEqual(
                {
                    ...initialState,
                    passResetRequest: true
                }
            )
    })

    it('shuold pass refresh error', () => {
        expect(refreshReduser( initialState, {type: PASS_REFRESH_ERROR})).toEqual(
                {
                    ...initialState,
                    passResetError: true
                }
            )
    })

    it('shuold pass refresh success', () => {
        expect(refreshReduser( initialState, {type: PASS_REFRESH_SUCCESS, check: true})).toEqual(
                {
                    ...initialState,
                    passResetSuccess: true
                }
            )
    })
})