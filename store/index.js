import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { reducer as formReducer } from 'redux-form'

// import reducers
import auth from '~store/auth/reducer'
import menu from '~store/menu/reducer'
import vehicles from '~store/vehicles/reducer'
// import sagas
import authSaga from '~store/auth/sagas'
import vehiclesSaga from '~store/vehicles/sagas'

const sagaMiddleware = createSagaMiddleware()

const RootReducer = combineReducers({
  auth,
  menu,
  vehicles,
  form: formReducer,
})

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

const RootSagas = function* root() {
  yield all([...authSaga, ...vehiclesSaga])
}

sagaMiddleware.run(RootSagas)

export default store
