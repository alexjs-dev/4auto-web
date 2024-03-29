import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { Button, Input } from '../../../../../components'
import {
  fieldTypes,
  validateFormData,
} from '../../../../../utils/formValidators'
import { FORMS, requiredFields } from '../../../../../utils/util'
import styles from './CreateListingBaseForm.module.scss'

type Props = any

const step = 1

const CreateListingBaseForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  setStep,
}) => {
  const { t } = useTranslation()
  const onSubmit = async (values: any) => {
    await validateFormData(values, requiredFields[step], {
      scrollToError: true,
    })

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
        id="create-listing-button-1"
        label={t('button.continue')}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}

const Form = reduxForm({
  form: FORMS[step],
  destroyOnUnmount: false,
})(CreateListingBaseForm)

export default Form
