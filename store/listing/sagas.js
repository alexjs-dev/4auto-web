import { takeLatest, put, call } from 'redux-saga/effects'
import ListingsService from '~services/listings'
import { Types } from './creators'

const listingsService = new ListingsService()

function* handleFetchListingById(action) {
  try {
    const { id } = action
    const data = yield call(listingsService.get, id)
    yield put({
      type: Types.FETCH_LISTING_BY_ID_SUCCESS,
      data,
    })
  } catch (error) {
    console.error(error)
    yield put({ type: Types.FETCH_LISTING_BY_ID_FAILURE })
  }
}

const sagas = [takeLatest(Types.FETCH_LISTING_BY_ID, handleFetchListingById)]

export default sagas
