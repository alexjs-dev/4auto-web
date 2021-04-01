import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { reducer as formReducer } from 'redux-form'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import reducers
import auth from '~store/auth/reducer'
import menu from '~store/menu/reducer'
import vehicles from '~store/vehicles/reducer'
import listing from '~store/listing/reducer'
import user from '~store/user/reducer'
import locations from '~store/locations/reducer'
// import sagas
import authSaga from '~store/auth/sagas'
import vehiclesSaga from '~store/vehicles/sagas'
import listingSaga from '~store/listing/sagas'
import userSaga from '~store/user/sagas'
import locationsSaga from '~store/locations/sagas'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  auth,
  menu,
  vehicles,
  listing,
  user,
  locations,
  form: formReducer,
})

const persistConfig = {
  key: 'root',
  whitelist: ['auth'],
  storage,
}

const RootReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

const RootSagas = function* root() {
  yield all([...authSaga, ...vehiclesSaga, ...listingSaga, ...userSaga, ...locationsSaga])
}

sagaMiddleware.run(RootSagas)

export const persistor = persistStore(store)

export default store
