import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchListingById: ['id'],
    fetchListingByIdSuccess: ['data'],
    fetchListingByIdFailure: [],
    createListing: ['data'],
    createListingSuccess: ['data'],
    createListingFailure: [],
    fetchListings: ['params'],
    fetchListingsSuccess: ['data'],
    fetchListingsFailure: [],
  },
  {}
)

export default Creators
