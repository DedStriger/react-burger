import { LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, SET_USER_ERROR, SET_USER_REQUEST, SET_USER_SUCCESS } from '../../actions/constant';
import userReducer from "../userReducer"

describe('user reducer', () => {
    it('should initial', () => {
        expect(userReducer(undefined, {type: ''})).toEqual(
            {
                email: '',
                name: '',
                error: false,
                request: false,
                auth: false,
                logoutRequest: false,
                logoutError: false,
                logoutSuccess: false
            }
            
        )
    })

    it('should user request', () => {
        expect(userReducer(
            {
                email: '',
                name: '',
                error: false,
                request: false,
                auth: false,
                logoutRequest: false,
                logoutError: false,
                logoutSuccess: false
            }, 
            {type: SET_USER_REQUEST}
        )).toEqual({
            email: '',
            name: '',
            error: false,
            request: true,
            auth: false,
            logoutRequest: false,
            logoutError: false,
            logoutSuccess: false
        })
    })

    it('should user error', () => {
        expect(userReducer(
            {
                email: '',
                name: '',
                error: false,
                request: false,
                auth: false,
                logoutRequest: false,
                logoutError: false,
                logoutSuccess: false
            }, 
            {type: SET_USER_ERROR}
        )).toEqual({
            email: '',
            name: '',
            error: true,
            request: false,
            auth: false,
            logoutRequest: false,
            logoutError: false,
            logoutSuccess: false
        })
    })

    
    it('should user success', () => {
        expect(userReducer(
            {
                email: '',
                name: '',
                error: false,
                request: false,
                auth: false,
                logoutRequest: false,
                logoutError: false,
                logoutSuccess: false
            }, 
            {type: SET_USER_SUCCESS, email: 'test@mail.ru', name: 'test'}
        )).toEqual({
            email: 'test@mail.ru',
            name: 'test',
            error: false,
            request: false,
            auth: true,
            logoutRequest: false,
            logoutError: false,
            logoutSuccess: false
        })
    })

    it('should logout request', () => {
        expect(userReducer(
            {
                email: '',
                name: '',
                error: false,
                request: false,
                auth: false,
                logoutRequest: false,
                logoutError: false,
                logoutSuccess: false
            }, 
            {type: LOGOUT_USER_REQUEST}
        )).toEqual({
            email: '',
            name: '',
            error: false,
            request: false,
            auth: false,
            logoutRequest: true,
            logoutError: false,
            logoutSuccess: false
        })
    })

    it('should logout error', () => {
        expect(userReducer(
            {
                email: '',
                name: '',
                error: false,
                request: false,
                auth: false,
                logoutRequest: false,
                logoutError: false,
                logoutSuccess: false
            }, 
            {type: LOGOUT_USER_ERROR}
        )).toEqual({
            email: '',
            name: '',
            error: false,
            request: false,
            auth: false,
            logoutRequest: false,
            logoutError: true,
            logoutSuccess: false
        })
    })

    it('should logout success', () => {
        expect(userReducer(
            {
                email: '',
                name: '',
                error: false,
                request: false,
                auth: false,
                logoutRequest: false,
                logoutError: false,
                logoutSuccess: false
            }, 
            {type: LOGOUT_USER_SUCCESS, check: true}
        )).toEqual({
            email: '',
            name: '',
            error: false,
            request: false,
            auth: false,
            logoutRequest: false,
            logoutError: false,
            logoutSuccess: true
        })
    })
})