import { takeLatest, put, call } from 'redux-saga/effects'
import { omit } from 'lodash'
import ModelsService from '~services/models'
import MakesService from '~services/makes'
import { Types } from './creators'

const modelsService = new ModelsService()
const makesService = new MakesService()

function* handleFetchMakes(action) {
  try {
    const { params } = action
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
  takeLatest(Types.FETCH_MAKES, handleFetchMakes),
  takeLatest(Types.FETCH_MODELS, handleFetchModels),
]

export default sagas
