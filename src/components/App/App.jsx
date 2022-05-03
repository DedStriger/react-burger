import React, { useCallback, useEffect, useState } from 'react';
import {IngredientPage, OrdersPage} from '../../pages'
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { FORGOT_URL, LOGIN_URL, MAIN_URL, ORDERS_URL, PROFILE_URL, REGISTRATION_URL, RESET_URL, INGRIDIENT_URL } from '../../utils/urls';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import checkUser from '../../service/actions/checkUSer';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { DELETE_MODAL_INGRIDIENTS, GET_ON_MODAL_INGRIDIENTS } from '../../service/actions/constant';
import getIngridients from '../../service/actions/getIngridients';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Forgot from '../Forgot/Forgot';
import Reset from '../Reset/Reset';
import Profile from '../Profile/Profile';
function App() {
  const ModalSwitch = () => {
  const dispatch = useDispatch()
  const [isLoad, setIsLoad] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const modal = useSelector(store => store.modals.activeModal)
  const ingredients = useSelector(store => store.ingridients.burgerIngridients)
  const logout = useSelector(store => store.user.logoutSuccess)
  let background = location.state && location.state.background;
  const onClose = useCallback(() => {
    localStorage.removeItem('id')
    history.replace({pathname: MAIN_URL})
    dispatch({type: DELETE_MODAL_INGRIDIENTS})
  }, [history, dispatch, location])
  const init = async () => {
   !logout && await dispatch(checkUser())
    setIsLoad(true)
  }

  useEffect(() => {
    init()
    dispatch(getIngridients())
  }, [])

  if(!isLoad){
    return null
  }
  return (
    <div className="App">
      <AppHeader/>
      <Switch location={background || location}>
        <Route path={MAIN_URL} exact>
          <Main/>
        </Route>
        <ProtectedRoute path={LOGIN_URL} exact noAuthRoute={PROFILE_URL} kind='login'>
          <Login/>
        </ProtectedRoute>
        <ProtectedRoute path={REGISTRATION_URL} exact noAuthRoute={PROFILE_URL} kind='login'>
          <Registration/>
        </ProtectedRoute>
        <ProtectedRoute path={FORGOT_URL} exact noAuthRoute={PROFILE_URL} kind='login'>
          <Forgot/>
        </ProtectedRoute>
        <ProtectedRoute path={RESET_URL} exact noAuthRoute={FORGOT_URL} kind='email'>
          <Reset/>
        </ProtectedRoute>
        <ProtectedRoute path={PROFILE_URL} exact noAuthRoute={LOGIN_URL} kind='user'>
          <Profile/>
        </ProtectedRoute>
        <ProtectedRoute path={ORDERS_URL} exact noAuthRoute={LOGIN_URL} kind='user'>
          <OrdersPage/>
        </ProtectedRoute>
        <Route exact path={INGRIDIENT_URL+":id"}>
          <IngredientPage/>
        </Route>
      </Switch>
      {background && Object.keys(modal).length !== 0 ? ( 
          <Route
            path={INGRIDIENT_URL+":id"}
            children={
               <Modal onClose={onClose}>
               <IngredientDetails {...modal}/>
              </Modal>}
            
          />
        ) : (
          (() => {
            let id = localStorage.getItem('id')
                  let item = ingredients.filter(_ => _._id === id)[0]
                  dispatch({type: GET_ON_MODAL_INGRIDIENTS, item: item})
          })()
        )}
    </div>
  );
  }

  return(
    <Router>
      <ModalSwitch/>
    </Router>
  )
}


export default App;
