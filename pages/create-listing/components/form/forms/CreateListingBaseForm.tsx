import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { Button, Input } from '../../../../../components'
import {
  fieldTypes,
  validateFormData,
} from '../../../../../utils/formValidators'
import styles from './CreateListingBaseForm.module.scss'

type Props = any

const CreateListingBaseForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  setStep,
}) => {
  const { t } = useTranslation()
  const onSubmit = async (values: any) => {
    await validateFormData(values, [fieldTypes.regNumber])
    setStep(2)
  }
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(onSubmit)
      }}
    >
      <h1>{t('titles.createListing')}</h1>
      <Input
        /* @ts-ignore */
        name={fieldTypes.regNumber}
        label={t('label.regNumber')}
        placeholder="123ABC"
        isRequired
      />
      <Input
        /* @ts-ignore */
        name={fieldTypes.VIN}
        label={t('label.VIN')}
        placeholder="ABYZX012AM929200"
      />
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
  form: 'createListingBaseForm',
  destroyOnUnmount: false,
})(CreateListingBaseForm)

export default Form
