import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { Button, Input } from '~components'
import styles from './OfferForm.module.scss'

const OfferForm = ({ handleSubmit, disabled }) => {
  const { t } = useTranslation()
  const onSubmit = (val) => {
    console.log('values', val)
  }
  return (
    <form
      className={styles.offer}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(onSubmit)
      }}
    >
      <Input
        name="offer"
        label={t('label.yourOffer')}
        placeholder="€"
        type="number"
        disabled={disabled}
        small
        min={1}
      />
      <Button
        fluid
        label="Offer"
        disabled={disabled}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}

const Offer = reduxForm({
  form: 'offerForm',
})(OfferForm)

export default Offer
