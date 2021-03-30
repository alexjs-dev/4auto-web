import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { keys, includes } from 'lodash'
import { formValueSelector, change } from 'redux-form' // tslint:disable
import { modelsSelector } from '~/store/vehicles/selectors'
import Creators from '../store/vehicles/creators'
import { fieldTypes } from '../utils/formValidators'

const useFetchVehicleModels = (form?: string) => {
  const dispatch = useDispatch()
  const selectFormValue = (form && formValueSelector(form)) || null
  const selectedMake = useSelector(
    (state) => selectFormValue && selectFormValue(state, fieldTypes.make)
  )
  const selectedModel = useSelector(
    (state) => selectFormValue && selectFormValue(state, fieldTypes.model)
  )
  const models = useSelector(modelsSelector)

  useEffect(() => {
    dispatch(Creators.fetchModels())
    dispatch(Creators.fetchMakes())
  }, [])

  useEffect(() => {
    if (selectedMake && form) {
      dispatch(
        Creators.fetchModels({ resetPagination: true, makeId: selectedMake })
      )
      if (!includes(keys(models), selectedModel))
        dispatch(change(form, fieldTypes.model, null))
    }
  }, [selectedMake, selectedModel, form])
}

export default useFetchVehicleModels
