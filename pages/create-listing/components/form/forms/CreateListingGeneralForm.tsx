import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import get from 'lodash/get'
import { reduxForm, getFormValues, change } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { Button, Input } from '../../../../../components'
import {
  fieldTypes,
  validateFormData,
} from '../../../../../utils/formValidators'
import styles from './CreateListingGeneralForm.module.scss'
import BaseVehicleFields from '~/components/Forms/parts/BaseVehicleFields'

type Props = any

const form = 'createListingGeneralForm'

const CreateListingGeneralForm: React.FunctionComponent<Props> = ({
  handleSubmit,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const baseFormValues = useSelector(getFormValues('createListingBaseForm'))
  const regNumber = get(baseFormValues, fieldTypes.regNumber)
  useEffect(() => {
    if (regNumber) {
      dispatch(change(form, fieldTypes.regNumber, regNumber))
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
      <Input
        /* @ts-ignore */
        name={fieldTypes.regNumber}
        label={t('label.regNumber')}
        placeholder="123ABC"
        disabled
        isRequired
      />
      <BaseVehicleFields singleVehicleBodySelect />
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
