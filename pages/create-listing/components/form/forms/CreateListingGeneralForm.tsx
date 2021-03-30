import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../components'
import { validateFormData } from '../../../../../utils/formValidators'
import styles from './CreateListingGeneralForm.module.scss'
import BaseVehicleFields from '~/components/Forms/parts/BaseVehicleFields'
import AdvVehicleFields from '~/components/Forms/parts/AdvVehicleFields'
import { FORMS, requiredFields } from '../util'

type Props = any

const step = 2

const CreateListingGeneralForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  setStep,
}) => {
  const { t } = useTranslation()

  const onSubmit = async (values: any) => {
    await validateFormData(values, requiredFields[step], {
      scrollToError: true,
    })
    setStep(3)
  }
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(onSubmit)
      }}
    >
      <h1>{t('titles.generalDetails')}</h1>
      <BaseVehicleFields
        singleVehicleBodySelect
        requiredFields={requiredFields[step]}
      />
      <AdvVehicleFields requiredFields={requiredFields[step]} />
      <Button
        fluid
        haptic
        label={t('button.continue')}
        id="create-listing-button-2"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}

const Form = reduxForm({
  form: FORMS[step],
  destroyOnUnmount: false,
})(CreateListingGeneralForm)

export default Form
