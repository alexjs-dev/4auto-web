import React from 'react'
import { reduxForm } from 'redux-form'
import { Button, Input } from '~components'
import styles from './OfferForm.module.scss'

const OfferForm = ({ handleSubmit }) => {
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
        label="YOUR OFFER"
        placeholder="€"
        type="number"
        small
        min={1}
      />
      <Button fluid label="Offer" onClick={handleSubmit(onSubmit)} />
    </form>
  )
}

const Offer = reduxForm({
  form: 'offerForm',
})(OfferForm)

export default Offer
