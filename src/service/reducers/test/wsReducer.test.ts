import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../../actions/constant';

  import { wsReducer } from '../wsReducer';

  describe('ws reducer', () => {
    it('should initial', () => {
        expect(wsReducer(undefined, {type: '', payload: {}})).toEqual(
            {
                wsConnected: false,
                get: false,
                messages: []
            }
            
        )
    })

    it('should success ws conection', () => {
        expect(wsReducer({
            wsConnected: false,
                get: false,
                messages: []
        }, {type: WS_CONNECTION_SUCCESS, payload: {}})).toEqual(
            {
                wsConnected: true,
                get: false,
                messages: []
            }
            
        )
    })

    it('should error ws conection', () => {
        expect(wsReducer({
            wsConnected: false,
                get: false,
                messages: []
        }, {type: WS_CONNECTION_ERROR, payload: {}})).toEqual(
            {
                wsConnected: false,
                get: false,
                messages: []
            }
            
        )
    })

    it('should closed ws conection', () => {
        expect(wsReducer({
            wsConnected: false,
                get: false,
                messages: []
        }, {type: WS_CONNECTION_CLOSED, payload: {}})).toEqual(
            {
                wsConnected: false,
                get: false,
                messages: []
            }
            
        )
    })

    it('should get ws messages', () => {
        expect(wsReducer({
            wsConnected: false,
                get: false,
                messages: []
        }, {type: WS_GET_MESSAGE, payload: {success: true, orders: Array(50), total: 17924, totalToday: 92}})).toEqual(
            {
                wsConnected: false,
                get: true,
                messages: [{success: true, orders: Array(50), timestamp: new Date().getTime() / 1000, total: 17924, totalToday: 92}]
            }
            
        )
    })
})