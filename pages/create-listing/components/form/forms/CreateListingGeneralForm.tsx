import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../components'
import {
  fieldTypes,
  validateFormData,
} from '../../../../../utils/formValidators'
import styles from './CreateListingGeneralForm.module.scss'
import BaseVehicleFields from '~/components/Forms/parts/BaseVehicleFields'
import AdvVehicleFields from '~/components/Forms/parts/AdvVehicleFields'

type Props = any

const form = 'createListingGeneralForm'

const CreateListingGeneralForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  setStep,
}) => {
  const { t } = useTranslation()

  const requiredFields = [
    fieldTypes.make,
    fieldTypes.model,
    fieldTypes.fuel,
    fieldTypes.gearbox,
    fieldTypes.bodyType,
  ]

  const advRequiredFields = [
    fieldTypes.year,
    fieldTypes.month,
    fieldTypes.mileage,
    fieldTypes.power,
    fieldTypes.capacity,
    fieldTypes.consumptionCombined,
    fieldTypes.consumptionHighway,
    fieldTypes.consumptionUrban,
  ]

  const onSubmit = async (values: any) => {
    await validateFormData(values, [...requiredFields, ...advRequiredFields], {
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
        requiredFields={requiredFields}
      />
      <AdvVehicleFields requiredFields={advRequiredFields} />
      <Button
        fluid
        haptic
        label={t('button.continue')}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}

const Form = reduxForm({
  form,
  destroyOnUnmount: false,
})(CreateListingGeneralForm)

export default Form
