import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { Button, Input, Checkbox, ImageUpload } from '../../../../../components'
import {
  fieldTypes,
  validateFormData,
  findEmptyFields,
} from '../../../../../utils/formValidators'
import { FORMS, requiredFields } from '../../../../../utils/util'
import Creators from '../../../../../store/listing/creators'
import { listingCreationLoadingSelector } from '../../../../../store/listing/selectors'
import styles from './CreateListingListingForm.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getFormValues } from 'redux-form'
import isEmpty from 'lodash/isEmpty'
import LocationInput from '~/components/Input/LocationInput'

type Props = any

const step = 3

const CreateListingListingForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  setStep,
}) => {
  const { t } = useTranslation()
  const loading = useSelector(listingCreationLoadingSelector)
  const dispatch = useDispatch()
  const form2_values = useSelector(getFormValues(FORMS[2]))
  const form1_values = useSelector(getFormValues(FORMS[1]))
  const onSubmit = async (form3_values: any) => {
    await validateFormData(form3_values, requiredFields[step], {
      scrollToError: true,
    })
    const form2_errors = findEmptyFields(form2_values, requiredFields[2])
    if (!isEmpty(form2_errors)) {
      setStep(2)
      return
    }
    const form1_errors = findEmptyFields(form1_values, requiredFields[1])
    if (!isEmpty(form1_errors)) {
      setStep(1)
      return
    }
    const data = {
      ...form3_values,
      ...form2_values,
      ...form1_values,
    }
    dispatch(Creators.createListing(data))
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
        disabled={loading}
        label={t('label.price')}
        isRequired
        min={1}
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
      <ImageUpload
        name={fieldTypes.images}
        label={t('label.images')}
        isRequired
      />
      <LocationInput
        name={fieldTypes.locationId}
        isRequired
        disabled={loading}
        label={t('label.location')}
      />
      <Input
        /* @ts-ignore */
        name={fieldTypes.description}
        type="textarea"
        fluid
        loading={loading}
        label={t('label.description')}
      />
      <Input
        /* @ts-ignore */
        name={fieldTypes.contactPhone}
        type="number"
        fluid
        autocomplete="tel"
        loading={loading}
        label={t('label.phone')}
      />
      <Input
        /* @ts-ignore */
        name={fieldTypes.contactEmail}
        fluid
        type="email"
        autocomplete="email"
        loading={loading}
        label={t('label.email')}
      />
      <Button
        fluid
        loading={loading}
        haptic
        label={t('button.create')}
        id="create-listing-button-3"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}

const Form = reduxForm({
  form: FORMS[step],
  destroyOnUnmount: false,
})(CreateListingListingForm)

export default Form
