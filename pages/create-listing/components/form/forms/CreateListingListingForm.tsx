import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { Button, Input, Checkbox } from '../../../../../components'
import { fieldTypes } from '../../../../../utils/formValidators'
import styles from './CreateListingListingForm.module.scss'

type Props = any

const CreateListingListingForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  setStep,
}) => {
  const { t } = useTranslation()
  const onSubmit = async (values: any) => {
    console.log('values', values)
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
      <h1>{t('titles.listingDetails')}</h1>
      <Input
        /* @ts-ignore */
        name={fieldTypes.price}
        type="number"
        fluid
        label={t('label.price')}
        isRequired
        placeholder={t('placeholder.priceMax')}
      />
      {/*@ts-ignore */}
      <Checkbox
        name={fieldTypes.urgent}
        label={t('label.urgent')}
        tooltip="Listing will only last only 2 weeks (default 1 month), but will be marked as urgent"
        className={styles.checkbox}
      />
      {/*@ts-ignore */}
      <Checkbox
        name={fieldTypes.featured}
        label={`${t('label.featured')} (1 EUR)`}
        tooltip="Paid feature to get promoted for 1 month"
        className={styles.checkbox}
      />
      <Input
        /* @ts-ignore */
        name={fieldTypes.description}
        type="textarea"
        fluid
        label={t('label.description')}
      />
      <Button
        fluid
        label={t('button.create')}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}

const Form = reduxForm({
  form: 'createListingListingForm',
  destroyOnUnmount: false,
})(CreateListingListingForm)

export default Form
