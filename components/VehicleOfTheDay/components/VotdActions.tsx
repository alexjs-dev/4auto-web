import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiPhone, FiMail } from 'react-icons/fi'
import { Button } from '../..'
import styles from '../VehicleOfTheDay.module.scss'

type Props = {
  phone?: string
  email?: string
  userId: string
}

const VotdActions: React.FunctionComponent<Props> = ({
  phone,
  email,
  userId,
}) => {
  const { t } = useTranslation()
  return (
    <div className={styles.actions}>
      {phone && (
        <Button fluid type={Button.types.GHOST} href={`tel:${phone}`}>
          {t('button.call')} &nbsp; <FiPhone />
        </Button>
      )}
      {email && (
        <Button fluid type={Button.types.GHOST} href={`mailto:${email}`}>
          {t('button.mail')} &nbsp; <FiMail />
        </Button>
      )}
      <Button fluid label={t('button.message')} href={`/profile/${userId}`} />
    </div>
  )
}

export default VotdActions
