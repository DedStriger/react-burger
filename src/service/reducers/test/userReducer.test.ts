import { LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, SET_USER_ERROR, SET_USER_REQUEST, SET_USER_SUCCESS } from '../../actions/constant';
import userReducer from "../userReducer"

const initialState = {
    email: '',
    name: '',
    error: false,
    request: false,
    auth: false,
    logoutRequest: false,
    logoutError: false,
    logoutSuccess: false
}

describe('user reducer', () => {
    it('should initial', () => {
        expect(userReducer(undefined, {type: ''})).toEqual(initialState)
    })

    it('should user request', () => {
        expect(userReducer(initialState, 
            {type: SET_USER_REQUEST}
        )).toEqual({
            ...initialState,
            request: true,
        })
    })

    it('should user error', () => {
        expect(userReducer(initialState, 
            {type: SET_USER_ERROR}
        )).toEqual({
            ...initialState,
            error: true,
        })
    })

    
    it('should user success', () => {
        expect(userReducer(initialState, 
            {type: SET_USER_SUCCESS, email: 'test@mail.ru', name: 'test'}
        )).toEqual({
            ...initialState,
            email: 'test@mail.ru',
            name: 'test',
            auth: true
        })
    })

    it('should logout request', () => {
        expect(userReducer(initialState, 
            {type: LOGOUT_USER_REQUEST}
        )).toEqual({
            ...initialState,
            logoutRequest: true,
        })
    })

    it('should logout error', () => {
        expect(userReducer(initialState, 
            {type: LOGOUT_USER_ERROR}
        )).toEqual({
            ...initialState,
            logoutError: true
        })
    })

    it('should logout success', () => {
        expect(userReducer(initialState, 
            {type: LOGOUT_USER_SUCCESS, check: true}
        )).toEqual({
            ...initialState,
            logoutSuccess: true
        })
    })
})