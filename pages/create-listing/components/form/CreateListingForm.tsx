import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import { getFormValues } from 'redux-form'
import CreateListingBaseForm from './forms/CreateListingBaseForm'
import CreateListingGeneralForm from './forms/CreateListingGeneralForm'
import CreateListingListingForm from './forms/CreateListingListingForm'
import { fieldTypes } from '~/utils/formValidators'

type Props = {
  step: number
  setStep: (n: any) => void
}

const CreateListingForm: React.FunctionComponent<Props> = ({
  step,
  setStep,
}) => {
  const baseFormValues = useSelector(getFormValues('createListingBaseForm'))
  const regNumber = get(baseFormValues, fieldTypes.regNumber)
  useEffect(() => {
    if (!regNumber && step !== 1) {
      setStep(1)
    }
  }, [baseFormValues])

  switch (step) {
    case 2:
      /* @ts-ignore */
      return <CreateListingGeneralForm setStep={setStep} />
    case 3:
      /* @ts-ignore */
      return <CreateListingListingForm setStep={setStep} />
    case 1:
    default:
      /* @ts-ignore */
      return <CreateListingBaseForm setStep={setStep} />
  }
}

export default CreateListingForm
