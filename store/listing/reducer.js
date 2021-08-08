import { createReducer } from 'reduxsauce'
import { Types } from './creators'
import { keyBy, get } from 'lodash'

const INITIAL_STATE = {
  currentListing: {},
  loadingListing: false,
  creatingListing: false,
  listings: {},
  pagination: {},
  loading: false,
  featuredListings: {},
  featuredPagination: {},
  loadingFeatured: false,
  recommendedListings: {},
  recommendedPagination: {},
  loadingRecommended: false,
  userSoldListings: {},
  userSoldListingsPagination: {},
  loadingUserSoldListings: false,
  userAvailableListings: {},
  userAvailableListingsPagination: {},
  loadingUserAvailableListings: false,
  myListings: {},
  myListingsPagination: {},
  loadingMyListings: false,
}

const fetchMyListings = (state, { params }) => ({
  ...state,
  myListings: get(params, 'resetPagination') ? {} : state.myListings,
  myListingsPagination: get(params, 'resetPagination') ? {} : state.myListingsPagination,
  loadingMyListings: true,
})


const fetchMyListingsSuccess = (state, { data, pagination }) => ({
  ...state,
  myListings: {
    ...state.myListings,
    ...keyBy(data, '_id'),
  },
  loadingMyListings: false,
  myListingsPagination: pagination,
})

const fetchMyListingsFailure = (state) => ({
  ...state,
  loadingMyListings: false,
})

const fetchListingById = (state) => ({
  ...state,
  loadingListing: true,
})

const fetchListingByIdSuccess = (state, { data }) => ({
  ...state,
  loadingListing: false,
  currentListing: data,
})

const fetchListingByIdFailure = (state) => ({
  ...state,
  loadingListing: false,
})

const fetchListings = (state, { params }) => ({
  ...state,
  listings: get(params, 'resetPagination') ? {} : state.listings,
  pagination: get(params, 'resetPagination') ? {} : state.pagination,
  loading: true,
})

const fetchListingsSuccess = (state, { data, pagination }) => ({
  ...state,
  listings: {
    ...state.listings,
    ...keyBy(data, '_id'),
  },
  loading: false,
  pagination,
})

const fetchListingsFailure = (state) => ({
  ...state,
  loading: false,
})

const createListing = (state) => ({
  ...state,
  creatingListing: true,
})

const createListingSuccess = (state, { data }) => ({
  ...state,
  creatingListing: false,
  listings: {
    [data._id]: data,
    ...state.listings,
  },
})

const createListingFailure = (state) => ({
  ...state,
  creatingListing: false,
})

const fetchFeaturedListings = (state, { params }) => ({
  ...state,
  featuredListings: get(params, 'resetPagination')
    ? {}
    : state.featuredListings,
  featuredPagination: get(params, 'resetPagination')
    ? {}
    : state.featuredPagination,
  loadingFeatured: true,
})

const fetchFeaturedListingsSuccess = (state, { data, pagination }) => ({
  ...state,
  featuredListings: {
    ...state.featuredListings,
    ...keyBy(data, '_id'),
  },
  loadingFeatured: false,
  featuredPagination: pagination,
})

const fetchFeaturedListingsFailure = (state) => ({
  ...state,
  loadingFeatured: false,
})

const fetchRecommendedListings = (state, { params }) => ({
  ...state,
  recommendedListings: get(params, 'resetPagination')
    ? {}
    : state.recommendedListings,
  recommendedListings: get(params, 'resetPagination')
    ? {}
    : state.recommendedListings,
  loadingRecommended: true,
})

const fetchRecommendedListingsSuccess = (state, { data, pagination }) => ({
  ...state,
  recommendedListings: {
    ...state.recommendedListings,
    ...keyBy(data, '_id'),
  },
  loadingRecommended: false,
  recommendedPagination: pagination,
})

const fetchRecommendedListingsFailure = (state) => ({
  ...state,
  loadingRecommended: false,
})

const fetchUserSoldListings = (state, { params }) => ({
  ...state,
  userSoldListings: get(params, 'resetPagination')
    ? {}
    : state.userSoldListings,
  userSoldListingsPagination: get(params, 'resetPagination')
    ? {}
    : state.userSoldListingsPagination,
  loadingUserSoldListings: true,
})

const fetchUserSoldListingsSuccess = (state, { data, pagination }) => ({
  ...state,
  userSoldListings: {
    ...state.userSoldListings,
    ...keyBy(data, '_id'),
  },
  loadingUserSoldListings: false,
  userSoldListingsPagination: {
    ...pagination,
    skip: pagination?.skip || 0 + pagination?.limit || 10,
  },
})

const fetchUserSoldListingsFailure = (state) => ({
  ...state,
  loadingUserSoldListings: false,
})

const fetchUserAvailableListings = (state, { params }) => ({
  ...state,
  userAvailableListings: get(params, 'resetPagination')
    ? {}
    : state.userAvailableListings,
  userAvailableListingsPagination: get(params, 'resetPagination')
    ? {}
    : state.userAvailableListingsPagination,
  loadingUserAvailableListings: true,
})

const fetchUserAvailableListingsSuccess = (state, { data, pagination }) => ({
  ...state,
  userAvailableListings: {
    ...state.userAvailableListings,
    ...keyBy(data, '_id'),
  },
  loadingUserAvailableListings: false,
  userAvailableListingsPagination: {
    ...pagination,
    skip: pagination?.skip || 0 + pagination?.limit || 10,
  },
})

const fetchUserAvailableListingsFailure = (state) => ({
  ...state,
  loadingUserAvailableListings: false,
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_LISTING_BY_ID]: fetchListingById,
  [Types.FETCH_LISTING_BY_ID_SUCCESS]: fetchListingByIdSuccess,
  [Types.FETCH_LISTING_BY_ID_FAILURE]: fetchListingByIdFailure,
  [Types.FETCH_LISTINGS]: fetchListings,
  [Types.FETCH_LISTINGS_SUCCESS]: fetchListingsSuccess,
  [Types.FETCH_LISTINGS_FAILURE]: fetchListingsFailure,
  [Types.FETCH_FEATURED_LISTINGS]: fetchFeaturedListings,
  [Types.FETCH_FEATURED_LISTINGS_SUCCESS]: fetchFeaturedListingsSuccess,
  [Types.FETCH_FEATURED_LISTINGS_FAILURE]: fetchFeaturedListingsFailure,
  [Types.FETCH_RECOMMENDED_LISTINGS]: fetchRecommendedListings,
  [Types.FETCH_RECOMMENDED_LISTINGS_SUCCESS]: fetchRecommendedListingsSuccess,
  [Types.FETCH_RECOMMENDED_LISTINGS_FAILURE]: fetchRecommendedListingsFailure,
  [Types.CREATE_LISTING]: createListing,
  [Types.CREATE_LISTING_SUCCESS]: createListingSuccess,
  [Types.CREATE_LISTING_FAILURE]: createListingFailure,
  [Types.FETCH_USER_AVAILABLE_LISTINGS]: fetchUserAvailableListings,
  [Types.FETCH_USER_AVAILABLE_LISTINGS_SUCCESS]: fetchUserAvailableListingsSuccess,
  [Types.FETCH_USER_AVAILABLE_LISTINGS_FAILURE]: fetchUserAvailableListingsFailure,
  [Types.FETCH_USER_SOLD_LISTINGS]: fetchUserSoldListings,
  [Types.FETCH_USER_SOLD_LISTINGS_SUCCESS]: fetchUserSoldListingsSuccess,
  [Types.FETCH_USER_SOLD_LISTINGS_FAILURE]: fetchUserSoldListingsFailure,
  [Types.FETCH_MY_LISTINGS]: fetchMyListings,
  [Types.FETCH_MY_LISTINGS_SUCCESS]: fetchMyListingsSuccess,
  [Types.FETCH_MY_LISTINGS_FAILURE]: fetchMyListingsFailure,
})
