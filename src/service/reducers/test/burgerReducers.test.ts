import { burgerReducer } from "../burgerReducer";
import { GEt_BURGER_INGRIDIENTS_ERROR, GEt_BURGER_INGRIDIENTS_SUCCESS, GEt_BURGER_INGRIDIENTS__REQUEST } from '../../actions/constant';
import { testIngredient } from '../../../utils/testIngredient';

const initialState = {
  burgerIngridients: [],
  burgerIngridientsRequest: false,
  burgerIngridientsError: false
}

describe('burger reducer', () => {
    it('should initial burgerReducer', () => {
        expect(burgerReducer(undefined, {type: '', ingridients: []})).toEqual(initialState)
      })

      it('should handle ingredients request', () => {
        expect(burgerReducer( initialState, {type: GEt_BURGER_INGRIDIENTS__REQUEST, ingridients: []})).toEqual(
          {
            ...initialState,
            burgerIngridientsRequest: true,
          }
        )
      })

      it('should handle ingredients request error', () => {
        expect(burgerReducer({...initialState, burgerIngridientsRequest: true}, {type: GEt_BURGER_INGRIDIENTS_ERROR, ingridients: []})).toEqual(
          {
            ...initialState,
            burgerIngridientsError: true
          }
        )
      })

      it('should handle ingredients request success', () => {
        expect(burgerReducer( {
            ...initialState,
            burgerIngridientsRequest: true,
          }, {type: GEt_BURGER_INGRIDIENTS_SUCCESS, ingridients: [testIngredient]})).toEqual(
          {
            ...initialState,
            burgerIngridients: [testIngredient]
          }
        )
      })
})