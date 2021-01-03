import React from 'react'
import { OfferForm, Button } from '~components'
import useModal from '~hooks/useModal'
import styles from './OfferModal.module.scss'

const OfferModal = () => {
  const [_, __, closeModal] = useModal()
  return (
    <div className={styles.container}>
      <h5>Audi A6 3.0 110 Kw</h5>
      <p>5000€</p>
      <OfferForm />
      <Button
        color="red"
        label="Cancel"
        type={Button.types.GHOST}
        onClick={() => closeModal()}
      />
    </div>
  )
}

export default OfferModal
