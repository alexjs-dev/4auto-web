import { takeLatest, put, select, call } from 'redux-saga/effects'
import { get } from 'lodash'
import LocationsService from '~services/locations'

import { Types } from './creators'

const locationsService = new LocationsService()

function* fetchLocations() {
  try {
    const { data } = yield call(locationsService.find, { $limit: 200 })
    console.log('found locations', data)
    yield put({
      type: Types.FETCH_LOCATIONS_SUCCESS,
      data,
    })
  } catch (error) {
    console.error(error)
    yield put({ type: Types.FETCH_LOCATIONS_FAILURE })
  }
}


const sagas = [
  takeLatest(Types.FETCH_LOCATIONS, fetchLocations),
]

export default sagas
