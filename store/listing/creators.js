import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchListingById: ['id'],
    fetchListingByIdSuccess: ['data'],
    fetchListingByIdFailure: [],
  },
  {}
)

export default Creators
