import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { FiPhone, FiMail } from 'react-icons/fi'
import ChatCreators from '../../../store/chats/creators'
import { Button } from '../..'
import styles from '../VehicleOfTheDay.module.scss'

type Props = {
  phone?: string | null
  email?: string | null
  userId: string
  listingId?: string
}

const VotdActions: React.FunctionComponent<Props> = ({
  phone,
  email,
  userId,
  listingId,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const router = useRouter()
  const onCreateChat = () => {
    if (listingId) {
      dispatch(
        ChatCreators.createChat({
          listingId,
          recipientId: userId,
        })
      )
      setTimeout(() => {
        router.push('/messages')
      }, 900)
    }
  }
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
      <Button
        fluid
        label={t('button.message')}
        onClick={() => onCreateChat()}
      />
    </div>
  )
}

export default VotdActions
