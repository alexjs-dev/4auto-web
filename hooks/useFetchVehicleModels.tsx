import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formValueSelector, change } from 'redux-form' // tslint:disable
import Creators from '../store/vehicles/creators'
import { fieldTypes } from '../utils/formValidators'

const useFetchVehicleModels = (form?: string) => {
  const dispatch = useDispatch()
  const selectFormValue = (form && formValueSelector(form)) || null
  const selectedMake = useSelector(
    (state) => selectFormValue && selectFormValue(state, fieldTypes.make)
  )
  useEffect(() => {
    dispatch(Creators.fetchModels())
    dispatch(Creators.fetchMakes())
  }, [])

  useEffect(() => {
    if (selectedMake && form) {
      dispatch(change(form, fieldTypes.model, null))
      dispatch(
        Creators.fetchModels({ resetPagination: true, makeId: selectedMake })
      )
    }
  }, [selectedMake, form])
}

export default useFetchVehicleModels
