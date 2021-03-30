import { createReducer } from 'reduxsauce'
import { Types } from './creators'
import { keyBy, get } from 'lodash'

const INITIAL_STATE = {
  currentListing: {},
  loadingListing: false,
  creatingListing: false,
  loading: false,
  listings: {},
  pagination: {},
}

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
  pagination: {
    ...pagination,
    skip: pagination?.skip || 0 + pagination?.limit || 10,
  },
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

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_LISTING_BY_ID]: fetchListingById,
  [Types.FETCH_LISTING_BY_ID_SUCCESS]: fetchListingByIdSuccess,
  [Types.FETCH_LISTING_BY_ID_FAILURE]: fetchListingByIdFailure,
  [Types.FETCH_LISTINGS]: fetchListings,
  [Types.FETCH_LISTINGS_SUCCESS]: fetchListingsSuccess,
  [Types.FETCH_LISTINGS_FAILURE]: fetchListingsFailure,
  [Types.CREATE_LISTING]: createListing,
  [Types.CREATE_LISTING_SUCCESS]: createListingSuccess,
  [Types.CREATE_LISTING_FAILURE]: createListingFailure,
})
