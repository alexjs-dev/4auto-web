import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { FiLink2, FiEdit3 } from 'react-icons/fi'
import { Button } from '~components'
import { toast } from 'react-toastify'
import styles from './BaseScreen.module.scss'

const BaseAdminScreen = ({ visible, listingId }) => {
  const { t } = useTranslation()
  return (
    <div
      className={classNames(styles.overlayContent, visible && styles.visible)}
    >
      <Button
        type={Button.types.GHOST}
        fluid
        isInternalLink
        href={`/listings/${listingId}`}
        className={styles.overlayButton}
      >
        <FiEdit3 />
        &nbsp;
        {t('button.edit')}
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

export default BaseAdminScreen
