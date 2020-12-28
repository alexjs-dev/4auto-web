import React, { useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import BaseButton from './BaseButton'
import ArrowDownIcon from '~public/icons/arrow-down.svg'
import styles from './ExpandButton.module.scss'

const ExpandButton = ({ open, onToggle }) => {
  const { t } = useTranslation()
  const [fallback, setFallbackOpen] = useState(open)
  return (
    <BaseButton
      onClick={() => (onToggle && onToggle()) || setFallbackOpen(!fallback)}
      className={classNames(styles.container, open && styles.open)}
    >
      <span>
        {open === null
          ? fallback
          : open
          ? t('button.showLess')
          : t('button.showMore')}
      </span>
      <ArrowDownIcon />
    </BaseButton>
  )
}

ExpandButton.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func,
}

ExpandButton.defaultProps = {
  open: false,
  onToggle: null,
}

export default ExpandButton
