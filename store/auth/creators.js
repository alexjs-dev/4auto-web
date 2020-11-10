import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    logIn: ['params'],
    logInSuccess: ['data'],
    logInFailure: ['data'],
    logOut: [],
  },
  {}
)

export default Creators
