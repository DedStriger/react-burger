import { burgerReducer } from "../burgerReducer";
import { GEt_BURGER_INGRIDIENTS_ERROR, GEt_BURGER_INGRIDIENTS_SUCCESS, GEt_BURGER_INGRIDIENTS__REQUEST } from '../../actions/constant';
import { testIngredient } from '../../../utils/testIngredient';

describe('burger reducer', () => {
    it('should initial burgerReducer', () => {
        expect(burgerReducer(undefined, {type: '', ingridients: []})).toEqual(
          {
            burgerIngridients: [],
            burgerIngridientsRequest: false,
            burgerIngridientsError: false
          }
        )
      })

      it('should handle ingredients request', () => {
        expect(burgerReducer( {
            burgerIngridients: [],
            burgerIngridientsRequest: false,
            burgerIngridientsError: false
          }, {type: GEt_BURGER_INGRIDIENTS__REQUEST, ingridients: []})).toEqual(
          {
            burgerIngridients: [],
            burgerIngridientsRequest: true,
            burgerIngridientsError: false
          }
        )
      })

      it('should handle ingredients request error', () => {
        expect(burgerReducer( {
            burgerIngridients: [],
            burgerIngridientsRequest: false,
            burgerIngridientsError: false
          }, {type: GEt_BURGER_INGRIDIENTS_ERROR, ingridients: []})).toEqual(
          {
            burgerIngridients: [],
            burgerIngridientsRequest: false,
            burgerIngridientsError: true
          }
        )
      })

      it('should handle ingredients request success', () => {
        expect(burgerReducer( {
            burgerIngridients: [],
            burgerIngridientsRequest: true,
            burgerIngridientsError: false
          }, {type: GEt_BURGER_INGRIDIENTS_SUCCESS, ingridients: [testIngredient]})).toEqual(
          {
            burgerIngridients: [testIngredient],
            burgerIngridientsRequest: false,
            burgerIngridientsError: false
          }
        )
      })
})