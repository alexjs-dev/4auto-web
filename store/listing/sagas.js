import { takeLatest, put, select, call } from 'redux-saga/effects'
import { get, toNumber, omit } from 'lodash'
import i18n from '~i18n'
import moment from 'moment'
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
    const { month, year, make, model, capacity, ...rest } = data
    const images = get(data, 'images', [])

    const regDate = new moment(`${year}/${month}`, 'YYYY/MM').utc()

    const vehicle = yield call(vehiclesService.create, {
      ...data,
      regDate,
      vehicleExtras: {
        ...rest,
      },
      modelId: model,
      capacity: 1000 * capacity,
      makeId: make,
      images: images.map((image, index) => ({
        imageId: image._id,
        order: index,
        ...image,
      })),
    })
    const result = yield call(listingsService.create, {
      ...rest,
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
    }, 900)
  } catch (error) {
    console.error(error)
    yield put({ type: Types.CREATE_LISTING_FAILURE })
  }
}

const DAY_MS = 86400000 // 24 * 60 * 60 * 1000

function* handleFetchListingsCompose(action, type = 'DEFAULT') {
  const successType =
    type === 'FEATURED'
      ? Types.FETCH_FEATURED_LISTINGS_SUCCESS
      : type === 'RECOMMENDED'
      ? Types.FETCH_RECOMMENDED_LISTINGS_SUCCESS
      : Types.FETCH_LISTINGS_SUCCESS
  const failureType =
    type === 'FEATURED'
      ? Types.FETCH_FEATURED_LISTINGS_FAILURE
      : type === 'RECOMMENDED'
      ? Types.FETCH_RECOMMENDED_LISTINGS_FAILURE
      : Types.FETCH_LISTINGS_FAILURE
  try {
    const { params } = action
    const prevPagination = yield select((state) =>
      type === 'FEATURED'
        ? state.listing.featuredPagination
        : type === 'RECOMMENDED'
        ? state.listing.recommendedPagination
        : state.listing.pagination
    )
    const { limit = 10, skip = 0, total = 0 } = prevPagination // limit > 10 is too slow!

    if (skip + limit < total || total === 0) {
      const response = yield call(listingsService.find, {
        query: {
          $limit: limit,
          $sort: { createdAt: -1 },
          ...(skip > 0 ? { $skip: skip } : {}),
          availableUntil: {
            $gt: new Date().getTime() - DAY_MS,
          },
          ...(type === 'FEATURED'
            ? {
                featuredUntil: {
                  $gt: new Date().getTime() - DAY_MS,
                },
              }
            : {}),
          ...(type === 'RECOMMENDED'
            ? {
                recommendedUntil: {
                  $gt: new Date().getTime() - DAY_MS,
                },
              }
            : {}),
          ...omit(params, ['resetPagination']),
        },
      })
      const { data, ...pagination } = response
      yield put({
        type: successType,
        data,
        pagination: {
          ...pagination,
          skip: pagination.skip + pagination?.limit || 10,
        },
      })
    } else {
      yield put({
        type: successType,
        data: {},
        pagination: prevPagination,
      })
    }
  } catch (error) {
    console.error(error)
    yield put({ type: failureType })
  }
}

function* handleFetchUserListingsCompose(action, type = 'SOLD') {
  const successType =
    type === 'AVAILABLE'
      ? Types.FETCH_USER_AVAILABLE_LISTINGS_SUCCESS
      : Types.FETCH_USER_SOLD_LISTINGS_SUCCESS
  const failureType =
    type === 'AVAILABLE'
      ? Types.FETCH_USER_AVAILABLE_LISTINGS_FAILURE
      : Types.FETCH_USER_SOLD_LISTINGS_FAILURE
  try {
    const { params, userId } = action
    const prevPagination = yield select((state) =>
      type === 'AVAILABLE'
        ? state.listing.userAvailableListingsPagination
        : state.listing.userSoldListingsPagination
    )
    const { limit = 10, skip = 0, total = 0 } = prevPagination

    if (skip + limit < total || total === 0) {
      const response = yield call(listingsService.find, {
        query: {
          $limit: limit,
          userId,
          $sort: { createdAt: -1 },
          ...(skip > 0 ? { $skip: skip } : {}),
          userFilter: type === 'AVAILABLE' ? 'available' : 'sold',
          ...params,
        },
      })
      const { data, ...pagination } = response
      yield put({
        type: successType,
        data,
        pagination,
      })
    } else {
      yield put({
        type: successType,
        data: {},
        pagination: prevPagination,
      })
    }
  } catch (error) {
    console.error(error)
    yield put({ type: failureType })
  }
}

const sagas = [
  takeLatest(Types.FETCH_LISTING_BY_ID, handleFetchListingById),
  takeLatest(Types.FETCH_LISTINGS, handleFetchListingsCompose),
  takeLatest(Types.FETCH_RECOMMENDED_LISTINGS, (action) =>
    handleFetchListingsCompose(action, 'RECOMMENDED')
  ),
  takeLatest(Types.FETCH_FEATURED_LISTINGS, (action) =>
    handleFetchListingsCompose(action, 'FEATURED')
  ),
  takeLatest(Types.FETCH_USER_AVAILABLE_LISTINGS, (action) =>
    handleFetchUserListingsCompose(action, 'AVAILABLE')
  ),
  takeLatest(Types.FETCH_USER_SOLD_LISTINGS, (action) =>
    handleFetchUserListingsCompose(action, 'SOLD')
  ),
  takeLatest(Types.CREATE_LISTING, handleCreateListing),
]

export default sagas
