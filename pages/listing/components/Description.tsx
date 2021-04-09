import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import size from 'lodash/size'
import styles from '../listing.module.scss'
import BaseButton from '../../../components/Button/BaseButton'

type Props = {
  description?: string
}

const Description: React.FunctionComponent<Props> = ({ description }) => {
  const [isShortened, setShortned] = useState(true)
  const isMoreDescriptionRequired = description && size(description) >= 520
  const { t } = useTranslation()
  if (!description) return null
  return (
    <p className={styles.description}>
      {isShortened ? description && description.substring(0, 400) : description}
      &nbsp;
      {description && isMoreDescriptionRequired && (
        /* @ts-ignore */
        <BaseButton onClick={() => setShortned(!isShortened)}>
          {isShortened ? t('button.showMore') : t('button.showLess')}...
        </BaseButton>
      )}
    </p>
  )
}

export default Description
