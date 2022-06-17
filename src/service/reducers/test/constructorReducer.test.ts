import { DELETE_CONSTRUCTOR_ELEMENT, UPDATE_BUN, UPDATE_CONSTRUCTOR_LIST, RELOAD_CONSTRUCTOR_LIST } from '../../actions/constant';
import constructorReducer from "../constructorReducer"
import { testIngredient } from '../../../utils/testIngredient';

describe('constructor reducer', () => {
    it('should initial constructorReduce',() => {
        expect(constructorReducer(undefined, {type: ''})).toEqual(
            {
                constructorList: [],
                bun: {},
                uuids: []
            }
        )
    })

    it('shoud update list', () => {
        expect(constructorReducer({constructorList: [],
            bun: {},
            uuids: []}, {type: UPDATE_CONSTRUCTOR_LIST, item: testIngredient, uuid: '1213'})).toEqual(
                {
                    constructorList: [testIngredient],
                    bun: {},
                    uuids: ['1213']
                }
            )
    })

    it('shoud delete item from list', () => {
        expect(constructorReducer({constructorList: [testIngredient] as never,
            bun: {},
            uuids: []}, {type: DELETE_CONSTRUCTOR_ELEMENT, index: 0})).toEqual(
                {
                    constructorList: [],
                    bun: {},
                    uuids: []
                }
            )
    })

    it('shoud reload list', () => {
        expect(constructorReducer({constructorList: [testIngredient] as never,
            bun: {},
            uuids: []}, {type: RELOAD_CONSTRUCTOR_LIST, array: [testIngredient],})).toEqual(
                {
                    constructorList: [testIngredient],
                    bun: {},
                    uuids: []
                }
            )
    })

    it('shoud add bun', () => {
        expect(constructorReducer({constructorList: [],
            bun: {},
            uuids: []}, {type: UPDATE_BUN, item: testIngredient,})).toEqual(
                {
                    constructorList: [],
                    bun: testIngredient,
                    uuids: []
                }
            )
    })
})
