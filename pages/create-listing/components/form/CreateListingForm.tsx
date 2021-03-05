import React from 'react'
import CreateListingBaseForm from './forms/CreateListingBaseForm'
import CreateListingGeneralForm from './forms/CreateListingGeneralForm'

type Props = {
  step: number
  setStep: (n: any) => void
}

const CreateListingForm: React.FunctionComponent<Props> = ({
  step,
  setStep,
}) => {
  switch (step) {
    case 2:
      /* @ts-ignore */
      return <CreateListingGeneralForm setStep={setStep} />
    case 1:
    default:
      /* @ts-ignore */
      return <CreateListingBaseForm setStep={setStep} />
  }
}

export default CreateListingForm
