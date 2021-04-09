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
    fetchFeaturedListings: ['params'],
    fetchFeaturedListingsSuccess: ['data'],
    fetchFeaturedListingsFailure: [],
    fetchRecommendedListings: ['params'],
    fetchRecommendedListingsSuccess: ['data'],
    fetchRecommendedListingsFailure: [],
    fetchUserAvailableListings: ['userId', 'params'],
    fetchUserAvailableListingsSuccess: ['data'],
    fetchUserAvailableListingsFailure: [],
    fetchUserSoldListings: ['userId', 'params'],
    fetchUserSoldListingsSuccess: ['data'],
    fetchUserSoldListingsFailure: [],
  },
  {}
)

export default Creators
