import { createReducer } from 'reduxsauce'
import { Types } from './creators'

const INITIAL_STATE = {
  currentListing: {},
  loadingListing: false,
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

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_LISTING_BY_ID]: fetchListingById,
  [Types.FETCH_LISTING_BY_ID_SUCCESS]: fetchListingByIdSuccess,
  [Types.FETCH_LISTING_BY_ID_FAILURE]: fetchListingByIdFailure,
})
