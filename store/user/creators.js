import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchUserById: ['id'],
    fetchUserByIdSuccess: ['data'],
    fetchUserByIdFailure: [],
  },
  {}
)

export default Creators
