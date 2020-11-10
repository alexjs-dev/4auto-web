import { createReducer } from 'reduxsauce'
import { Types } from './creators'

const INITIAL_STATE = {
  currentUser: {},
  loading: false,
}

const logIn = state => ({
  ...state,
  loading: true,
})

const logOut = state => ({
  ...state,
  loading: false,
  currentUser: {},
})

const logInSuccess = (state, { data }) => ({
  ...state,
  loading: false,
  currentUser: data,
})

const logInFailure = state => ({
  ...state,
  loading: false,
})

export default createReducer(INITIAL_STATE, {
  [Types.LOG_IN]: logIn,
  [Types.LOG_IN_SUCCESS]: logInSuccess,
  [Types.LOG_IN_FAILURE]: logInFailure,
  [Types.LOG_OUT]: logOut,
})
