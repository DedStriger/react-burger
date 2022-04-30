import React, { useCallback, useEffect, useState } from 'react';
import {MainPage, LoginPage, RegistrationPage, ForgotPage, ResetPage, IngredientPage} from '../../pages'
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { FORGOT_URL, LOGIN_URL, MAIN_URL, ORDERS_URL, PROFILE_URL, REGISTRATION_URL, RESET_URL, INGRIDIENT_URL } from '../../utils/urls';
import ProfilePage from '../../pages/ProfilePage';
import OrdersPage from '../../pages/OrdersPage';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import checkUser from '../../utils/checkUSer';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { DELETE_MODAL_INGRIDIENTS } from '../../service/actions/constant';
function App() {
  const ModalSwitch = () => {
    const dispatch = useDispatch()
  const [isLoad, setIsLoad] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const modal = useSelector(store => store.modals.activeModal)
  let background = location.state && location.state.background;
  const onClose = useCallback(() => {
    history.goBack({state: {background: location}})
    dispatch({type: DELETE_MODAL_INGRIDIENTS})
  }, [history, dispatch, location])
  const init = async () => {
    await checkUser(dispatch)
    setIsLoad(true)
  }

  useEffect(() => {
    init()
  })

  if(!isLoad){
    return null
  }

  return (
    <div className="App">
      <Switch location={background || location}>
        <Route path={MAIN_URL} exact>
          <MainPage/>
        </Route>
        <ProtectedRoute path={LOGIN_URL} exact noAuthRoute={PROFILE_URL} kind='login'>
          <LoginPage/>
        </ProtectedRoute>
        <ProtectedRoute path={REGISTRATION_URL} exact noAuthRoute={PROFILE_URL} kind='login'>
          <RegistrationPage/>
        </ProtectedRoute>
        <ProtectedRoute path={FORGOT_URL} exact noAuthRoute={PROFILE_URL} kind='login'>
          <ForgotPage/>
        </ProtectedRoute>
        <ProtectedRoute path={RESET_URL} exact noAuthRoute={FORGOT_URL} kind='email'>
          <ResetPage/>
        </ProtectedRoute>
        <ProtectedRoute path={PROFILE_URL} exact noAuthRoute={LOGIN_URL} kind='user'>
          <ProfilePage/>
        </ProtectedRoute>
        <ProtectedRoute path={ORDERS_URL} exact noAuthRoute={LOGIN_URL} kind='user'>
          <OrdersPage/>
        </ProtectedRoute>
        <Route exact path={INGRIDIENT_URL+":id"}>
          <IngredientPage/>
        </Route>
      </Switch>
      {background && (
          <Route
            path={INGRIDIENT_URL+":id"}
            children={
              Object.keys(modal).length !== 0 && <Modal onClose={onClose}>
                <IngredientDetails {...modal}/>
              </Modal>}
            
          />
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
