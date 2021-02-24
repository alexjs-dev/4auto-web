import { createReducer } from 'reduxsauce'
import { Types } from './creators'

const INITIAL_STATE = {
  currentUser: {},
  loadingUser: false,
}

const fetchUserById = (state) => ({
  ...state,
  loadingUser: true,
})

const fetchUserByIdSuccess = (state, { data }) => ({
  ...state,
  loadingUser: false,
  currentUser: data,
})

const fetchUserByIdFailure = (state) => ({
  ...state,
  loadingUser: false,
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_USER_BY_ID]: fetchUserById,
  [Types.FETCH_USER_BY_ID_SUCCESS]: fetchUserByIdSuccess,
  [Types.FETCH_USER_BY_ID_FAILURE]: fetchUserByIdFailure,
})
