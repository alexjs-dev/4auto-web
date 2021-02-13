import { createReducer } from 'reduxsauce'
import { keyBy, get } from 'lodash'
import { Types } from './creators'

const INITIAL_STATE = {
  listings: {},
  makes: {},
  models: {},
  pagination: {},
  loading: false,
  loadingModels: false,
  loadingMakes: false,
}

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

const fetchModels = (state, { params }) => ({
  ...state,
  models: get(params, 'resetPagination') ? {} : state.models,
  loadingModels: true,
})

const fetchModelsSuccess = (state, { data }) => ({
  ...state,
  models: {
    ...state.models,
    ...keyBy(data, '_id'),
  },
  loadingModels: false,
})

const fetchModelsFailure = (state) => ({
  ...state,
  loadingModels: false,
})

const fetchMakes = (state) => ({
  ...state,
  loadingMakes: true,
})

const fetchMakesSuccess = (state, { data }) => ({
  ...state,
  makes: {
    ...state.makes,
    ...keyBy(data, '_id'),
  },
  loadingMakes: false,
})

const fetchMakesFailure = (state) => ({
  ...state,
  loadingMakes: false,
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_LISTINGS]: fetchListings,
  [Types.FETCH_LISTINGS_SUCCESS]: fetchListingsSuccess,
  [Types.FETCH_LISTINGS_FAILURE]: fetchListingsFailure,
  [Types.FETCH_MODELS]: fetchModels,
  [Types.FETCH_MODELS_SUCCESS]: fetchModelsSuccess,
  [Types.FETCH_MODELS_FAILURE]: fetchModelsFailure,
  [Types.FETCH_MAKES]: fetchMakes,
  [Types.FETCH_MAKES_SUCCESS]: fetchMakesSuccess,
  [Types.FETCH_MAKES_FAILURE]: fetchMakesFailure,
})
