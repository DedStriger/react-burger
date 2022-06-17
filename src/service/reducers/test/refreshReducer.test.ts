import { PASS_REFRESH_ERROR, PASS_REFRESH_REQUEST, PASS_REFRESH_SUCCESS, REFRESH_ERROR, REFRESH_REQUEST, REFRESH_SUCCESS } from '../../actions/constant';
import refreshReduser from "../refreshReduser"

describe('refresh reducer', () => {
    it('should initial', () => {
        expect(refreshReduser(undefined, {type: ''})).toEqual(
            {
                checkEmail: false,
                request: false,
                error: false,
                passResetRequest: false,
                passResetError: false,
                passResetSuccess: false
            }
        )
    })

    it('shuold refresh request', () => {
        expect(refreshReduser( {
                checkEmail: false,
                request: false,
                error: false,
                passResetRequest: false,
                passResetError: false,
                passResetSuccess: false
            }, {type: REFRESH_REQUEST})).toEqual(
                {
                    checkEmail: false,
                    request: true,
                    error: false,
                    passResetRequest: false,
                    passResetError: false,
                    passResetSuccess: false
                }
            )
    })

    it('shuold refresh error', () => {
        expect(refreshReduser( {
                checkEmail: false,
                request: false,
                error: false,
                passResetRequest: false,
                passResetError: false,
                passResetSuccess: false
            }, {type: REFRESH_ERROR})).toEqual(
                {
                    checkEmail: false,
                    request: false,
                    error: true,
                    passResetRequest: false,
                    passResetError: false,
                    passResetSuccess: false
                }
            )
    })

    it('shuold refresh success', () => {
        expect(refreshReduser( {
                checkEmail: false,
                request: false,
                error: false,
                passResetRequest: false,
                passResetError: false,
                passResetSuccess: false
            }, {type: REFRESH_SUCCESS, check: true})).toEqual(
                {
                    checkEmail: true,
                    request: false,
                    error: false,
                    passResetRequest: false,
                    passResetError: false,
                    passResetSuccess: false
                }
            )
    })

    it('shuold pass refresh request', () => {
        expect(refreshReduser( {
                checkEmail: false,
                request: false,
                error: false,
                passResetRequest: false,
                passResetError: false,
                passResetSuccess: false
            }, {type: PASS_REFRESH_REQUEST})).toEqual(
                {
                    checkEmail: false,
                    request: false,
                    error: false,
                    passResetRequest: true,
                    passResetError: false,
                    passResetSuccess: false
                }
            )
    })

    it('shuold pass refresh error', () => {
        expect(refreshReduser( {
                checkEmail: false,
                request: false,
                error: false,
                passResetRequest: false,
                passResetError: false,
                passResetSuccess: false
            }, {type: PASS_REFRESH_ERROR})).toEqual(
                {
                    checkEmail: false,
                    request: false,
                    error: false,
                    passResetRequest: false,
                    passResetError: true,
                    passResetSuccess: false
                }
            )
    })

    it('shuold pass refresh success', () => {
        expect(refreshReduser( {
                checkEmail: false,
                request: false,
                error: false,
                passResetRequest: false,
                passResetError: false,
                passResetSuccess: false
            }, {type: PASS_REFRESH_SUCCESS, check: true})).toEqual(
                {
                    checkEmail: false,
                    request: false,
                    error: false,
                    passResetRequest: false,
                    passResetError: false,
                    passResetSuccess: true
                }
            )
    })
})