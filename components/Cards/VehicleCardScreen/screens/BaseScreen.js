import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { FiLink2, FiDollarSign, FiSend } from 'react-icons/fi'
import { Button } from '~components'
import useModal from '~hooks/useModal'
import { toast } from 'react-toastify'
import styles from './BaseScreen.module.scss'

const BaseScreen = ({ onChatScreenOpen, visible }) => {
  const [modalTypes, openModal] = useModal()
  const { t } = useTranslation()
  return (
    <div
      className={classNames(styles.overlayContent, visible && styles.visible)}
    >
      <Button
        type={Button.types.GHOST}
        fluid
        onClick={() => onChatScreenOpen && onChatScreenOpen()}
        className={styles.overlayButton}
      >
        <FiSend />
        &nbsp;
        {t('button.contact')}
      </Button>
      <Button
        type={Button.types.GHOST}
        fluid
        onClick={() => openModal(modalTypes.OFFER_MODAL)}
        className={styles.overlayButton}
      >
        <FiDollarSign />
        &nbsp;
        {t('button.offer')}
      </Button>
      <Button
        type={Button.types.GHOST}
        fluid
        onClick={() =>
          toast.success(`Link copied! 😍`, {
            autoClose: 1800,
          })
        }
        className={styles.overlayButton}
      >
        <FiLink2 />
        &nbsp;
        {t('button.share')}
      </Button>
    </div>
  )
}

export default BaseScreen
