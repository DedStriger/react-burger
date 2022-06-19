import { DELETE_CONSTRUCTOR_ELEMENT, UPDATE_BUN, UPDATE_CONSTRUCTOR_LIST, RELOAD_CONSTRUCTOR_LIST } from '../../actions/constant';
import constructorReducer from "../constructorReducer"
import { testIngredient } from '../../../utils/testIngredient';

const initialState = {
    constructorList: [],
    bun: {},
    uuids: []
}

describe('constructor reducer', () => {
    it('should initial constructorReduce',() => {
        expect(constructorReducer(undefined, {type: ''})).toEqual(
            initialState
        )
    })

    it('shoud update list', () => {
        expect(constructorReducer(initialState, {type: UPDATE_CONSTRUCTOR_LIST, item: testIngredient, uuid: '1213'})).toEqual(
                {
                    ...initialState,
                    constructorList: [testIngredient],
                    uuids: ['1213']
                }
            )
    })

    it('shoud delete item from list', () => {
        expect(constructorReducer({...initialState, constructorList: [testIngredient] as never}, {type: DELETE_CONSTRUCTOR_ELEMENT, index: 0})).toEqual(
            initialState
            )
    })

    it('shoud reload list', () => {
        expect(constructorReducer({...initialState, constructorList: [testIngredient] as never}, {type: RELOAD_CONSTRUCTOR_LIST, array: [testIngredient],})).toEqual(
                {
                    ...initialState,
                    constructorList: [testIngredient]
                }
            )
    })

    it('shoud add bun', () => {
        expect(constructorReducer(initialState, {type: UPDATE_BUN, item: testIngredient,})).toEqual(
                {
                    ...initialState,
                    bun: testIngredient
                }
            )
    })
})
