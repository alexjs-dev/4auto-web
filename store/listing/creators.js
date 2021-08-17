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
    fetchMyListings: [],
    fetchMyListingsSuccess: ['data'],
    fetchMyListingsFailure: [],
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
    updateMyListing: ['params'],
    updateMyListingSuccess: ['data'],
    updateMyListingFailure: [],
  },
  {}
)

export default Creators
