import { takeLatest, put, select, call } from 'redux-saga/effects'
import { get } from 'lodash'
import ListingsService from '~services/listings'
import VehiclesService from '~services/vehicles'

import { Types } from './creators'

const listingsService = new ListingsService()
const vehiclesService = new VehiclesService()

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

function* handleCreateListing(action) {
  try {
    const vehicle = yield call(vehiclesService.create, {
      ...action.data,
      modelId: get(action.data, 'model'),
      makeId: get(action.data, 'make'),
    })
    const data = yield call(listingsService.create, {
      ...action.data,
      vehicleId: vehicle._id,
      locationId: '60355ec4ea656b04fe5e0a2d',
    })

    yield put({
      type: Types.CREATE_LISTING_SUCCESS,
      data,
    })
  } catch (error) {
    console.error(error)
    yield put({ type: Types.CREATE_LISTING_FAILURE })
  }
}

function* handleFetchListings(action) {
  try {
    const { params } = action
    const prevPagination = yield select((state) => state.listing.pagination)
    const { limit = 10, skip = 0, total = 0 } = prevPagination

    if (skip + limit < total || total === 0) {
      const response = yield call(listingsService.find, {
        query: {
          $limit: limit,
          $sort: { createdAt: -1 },
          ...(skip > 0 ? { $skip: skip } : {}),
          // availableUntil: {
          //   $gt: new Date().getTime() - DAY_MS,
          // }, // TODO: remove in prod
          ...params,
        },
      })
      const { data, ...pagination } = response
      yield put({
        type: Types.FETCH_LISTINGS_SUCCESS,
        data,
        pagination,
      })
    } else {
      yield put({
        type: Types.FETCH_LISTINGS_SUCCESS,
        data: {},
        pagination: prevPagination,
      })
    }
  } catch (error) {
    console.error(error)
    yield put({ type: Types.FETCH_LISTINGS_FAILURE })
  }
}

const sagas = [
  takeLatest(Types.FETCH_LISTING_BY_ID, handleFetchListingById),
  takeLatest(Types.FETCH_LISTINGS, handleFetchListings),
  takeLatest(Types.CREATE_LISTING, handleCreateListing),
]

export default sagas
