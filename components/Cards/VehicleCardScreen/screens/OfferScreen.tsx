import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'
import OfferForm from '../../../Forms/OfferForm'
import Button from '../../../Button/Button'
import styles from './OfferScreen.module.scss'

type Props = {
  onCancel: () => void
  visible: boolean
  price?: number
  title: string
}

const OfferScreen: React.FunctionComponent<Props> = ({
  onCancel,
  visible,
  price,
  title,
}) => {
  const { t } = useTranslation()
  if (!visible) return null
  return (
    <div className={styles.container}>
      <h5>{title}</h5>
      {price && <p>{price}€</p>}
      <OfferForm />
      <Button
        color={Button.colors.RED}
        onClick={onCancel}
        fluid
        type={Button.types.GHOST}
      >
        <FiX />
        &nbsp;
        {t('button.close')}
      </Button>
    </div>
  )
}

export default OfferScreen
