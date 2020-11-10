import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchListings: ['params'],
    fetchListingsSuccess: ['data'],
    fetchListingsFailure: [],
    fetchMakes: ['params'],
    fetchMakesSuccess: ['data'],
    fetchMakesFailure: [],
    fetchModels: ['params'],
    fetchModelsSuccess: ['data'],
    fetchModelsFailure: [],
  },
  {}
)

export default Creators
