import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    logIn: ['params'],
    logInSuccess: ['data'],
    logInFailure: ['data'],
    signUp: ['params'],
    signUpSuccess: [],
    signUpFailure: ['data'],
    fetchSelf: [],
    fetchSelfSuccess: ['data'],
    fetchSelfFailure: [],
    logOut: [],
    logOutSuccess: [],
    logOutFailure: [],
  },
  {}
)

export default Creators
