import { createReducer } from 'reduxsauce'
import { Types } from './creators'

const INITIAL_STATE = {
  currentUser: {},
  accessToken: null,
  loading: false,
}

const logOut = (state) => ({
  ...state,
  loading: false,
  currentUser: {},
})

const logIn = (state) => ({
  ...state,
  loading: true,
})

const logInSuccess = (state, { data: { currentUser, accessToken } }) => ({
  ...state,
  loading: false,
  currentUser,
  accessToken,
})

const logInFailure = (state) => ({
  ...state,
  loading: false,
})

const signUp = (state) => ({
  ...state,
  loading: true,
})

const signUpSuccess = (state) => ({
  ...state,
  loading: false,
})

const signUpFailure = (state) => ({
  ...state,
  loading: false,
})

const fetchSelf = (state) => ({
  ...state,
  loading: true,
})

const fetchSelfSuccess = (state, { data }) => ({
  ...state,
  loading: false,
  currentUser: (data && data) || state.currentUser,
})

const fetchSelfFailure = (state) => ({
  ...state,
  loading: false,
})

export default createReducer(INITIAL_STATE, {
  [Types.LOG_IN]: logIn,
  [Types.LOG_IN_SUCCESS]: logInSuccess,
  [Types.LOG_IN_FAILURE]: logInFailure,
  [Types.SIGN_UP]: signUp,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure,
  [Types.FETCH_SELF]: fetchSelf,
  [Types.FETCH_SELF_SUCCESS]: fetchSelfSuccess,
  [Types.FETCH_SELF_FAILURE]: fetchSelfFailure,
  [Types.LOG_OUT]: logOut,
})
