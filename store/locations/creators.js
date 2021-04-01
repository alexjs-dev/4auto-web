import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchLocations: [],
    fetchLocationsSuccess: ['data'],
    fetchLocationsFailure: [],
    createLocation: ['data'],
    createLocationSuccess: ['data'],
    createLocationFailure: [],
  },
  {}
)

export default Creators
