import React from 'react'
import { reduxForm, change } from 'redux-form'
import { useTranslation } from 'react-i18next'
import get from 'lodash/get'
import toNumber from 'lodash/toNumber'
import { fieldTypes } from '~/utils/formValidators'
import { useDispatch } from 'react-redux'
import { Button, Input } from '~components'
import ChatCreators from '~store/chats/creators'
import styles from './OfferForm.module.scss'

const form = 'offerForm';

const OfferForm = ({ handleSubmit, listingId, disabled }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const onSubmit = (val) => {
    const offer = get(val, 'offer', 0)
    if (listingId && offer && toNumber(offer) > 0) {
      dispatch(
        ChatCreators.createChat({
          listingId,
          currency: 'EUR',
          offer: toNumber(offer),
          redirect: false,
        })
      )
      dispatch(change(form, fieldTypes.offer, null))
    }
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
        label={t('button.offer')}
        disabled={disabled}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}

const Offer = reduxForm({
  form,
})(OfferForm)

export default Offer
