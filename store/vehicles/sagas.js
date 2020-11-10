import { takeLatest, select, put, delay, call } from 'redux-saga/effects'
import { omit } from 'lodash'
import ListingsService from '~services/listings'
import ModelsService from '~services/models'
import MakesService from '~services/makes'
import { Types } from './creators'

const listingsService = new ListingsService()
const modelsService = new ModelsService()
const makesService = new MakesService()
const DAY_MS = 24 * 60 * 60 * 1000

function* handleFetchListings(action) {
  try {
    const { params } = action
    const prevPagination = yield select((state) => state.vehicles.pagination)
    const { limit = 10, skip = 0, total = 0 } = prevPagination

    if (skip + limit < total || total === 0) {
      const response = yield call(listingsService.find, {
        query: {
          $limit: limit,
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

function* handleFetchMakes(action) {
  try {
    const { params } = action
    yield delay(5000)
    const data = yield call(makesService.find, {
      query: {
        ...omit(params, 'resetPagination'),
      },
    })
    yield put({
      type: Types.FETCH_MAKES_SUCCESS,
      data,
    })
  } catch (error) {
    console.error(error)
    yield put({ type: Types.FETCH_MAKES_FAILURE })
  }
}

function* handleFetchModels(action) {
  try {
    const { params } = action
    yield delay(5000)
    const data = yield call(modelsService.find, {
      query: {
        ...omit(params, 'resetPagination'),
      },
    })
    yield put({
      type: Types.FETCH_MODELS_SUCCESS,
      data,
    })
  } catch (error) {
    console.error(error)
    yield put({ type: Types.FETCH_MODELS_FAILURE })
  }
}

const sagas = [
  takeLatest(Types.FETCH_LISTINGS, handleFetchListings),
  takeLatest(Types.FETCH_MAKES, handleFetchMakes),
  takeLatest(Types.FETCH_MODELS, handleFetchModels),
]

export default sagas
