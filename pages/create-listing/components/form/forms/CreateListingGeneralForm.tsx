import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import { reduxForm, getFormValues } from 'redux-form'
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
  const baseFormValues = useSelector(getFormValues('createListingBaseForm'))
  const regNumber = get(baseFormValues, fieldTypes.regNumber)
  useEffect(() => {
    if (!regNumber) {
      setStep(1)
    }
  }, [baseFormValues])

  const onSubmit = async (values: any) => {
    await validateFormData(values, [fieldTypes.regNumber])
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
      <BaseVehicleFields singleVehicleBodySelect />
      <AdvVehicleFields />
      <Button
        fluid
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
