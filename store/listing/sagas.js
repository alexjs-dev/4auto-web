import { takeLatest, put, select, call } from 'redux-saga/effects'
import { get, toNumber } from 'lodash'
import i18n from '~i18n'
import { reset } from 'redux-form'
import Router from 'next/router'
import { FORMS } from '../../utils/util'
import { toast } from 'react-toastify'
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
    const { data } = action
    const { month, year } = data
    const vehicle = yield call(vehiclesService.create, {
      ...data,
      regDate: new Date(toNumber(year), toNumber(month)),
      vehicleExtras: {
        ...data,
      },
      modelId: get(data, 'model'),
      makeId: get(data, 'make'),
    })
    const result = yield call(listingsService.create, {
      ...data,
      vehicleId: vehicle._id,
    })
    toast.success(i18n.t('snackbar.listingCreated'))
    yield put(reset(FORMS[1]))
    yield put(reset(FORMS[2]))
    yield put(reset(FORMS[3]))
    yield put({
      type: Types.CREATE_LISTING_SUCCESS,
      result,
    })
    setTimeout(() => {
      Router.push('/')
    }, 300)
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
