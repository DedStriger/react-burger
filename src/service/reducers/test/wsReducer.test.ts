import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../../actions/constant';

  import { wsReducer } from '../wsReducer';

  const initialState = {
    wsConnected: false,
    get: false,
    messages: []
}

  describe('ws reducer', () => {
    it('should initial', () => {
        expect(wsReducer(undefined, {type: '', payload: {}})).toEqual(initialState)
    })

    it('should success ws conection', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_SUCCESS, payload: {}})).toEqual(
            {
                ...initialState,
                wsConnected: true,
            }
            
        )
    })

    it('should error ws conection', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_ERROR, payload: {}})).toEqual(initialState)
    })

    it('should closed ws conection', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_CLOSED, payload: {}})).toEqual(initialState)
    })

    it('should get ws messages', () => {
        expect(wsReducer(initialState, {type: WS_GET_MESSAGE, payload: {success: true, orders: Array(50), total: 17924, totalToday: 92}})).toEqual(
            {
                ...initialState,
                get: true,
                messages: [{success: true, orders: Array(50), timestamp: new Date().getTime() / 1000, total: 17924, totalToday: 92}]
            }
            
        )
    })
})