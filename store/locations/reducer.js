import { createReducer } from 'reduxsauce'
import keyBy from 'lodash/keyBy'
import { Types } from './creators'

const INITIAL_STATE = {
  loading: false,
  locations: {},
}

const fetchLocations = (state) => ({
  ...state,
  loading: true,
})

const fetchLocationsSuccess = (state, { data }) => ({
  ...state,
  loading: false,
  locations: keyBy(data, '_id'),
})

const fetchLocationsFailure = (state) => ({
  ...state,
  loading: false,
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_LOCATIONS]: fetchLocations,
  [Types.FETCH_LOCATIONS_SUCCESS]: fetchLocationsSuccess,
  [Types.FETCH_LOCATIONS_FAILURE]: fetchLocationsFailure,
})
