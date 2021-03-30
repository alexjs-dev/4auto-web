import { createReducer } from 'reduxsauce'
import { keyBy, get } from 'lodash'
import { Types } from './creators'

const INITIAL_STATE = {
  makes: {},
  models: {},
  loadingModels: false,
  loadingMakes: false,
}

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
  [Types.FETCH_MODELS]: fetchModels,
  [Types.FETCH_MODELS_SUCCESS]: fetchModelsSuccess,
  [Types.FETCH_MODELS_FAILURE]: fetchModelsFailure,
  [Types.FETCH_MAKES]: fetchMakes,
  [Types.FETCH_MAKES_SUCCESS]: fetchMakesSuccess,
  [Types.FETCH_MAKES_FAILURE]: fetchMakesFailure,
})
