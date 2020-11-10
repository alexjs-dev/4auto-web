import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import BaseButton from './BaseButton'
import ArrowDownIcon from '~public/icons/arrow-down.svg'
import styles from './ExpandButton.module.scss'

const ExpandButton = ({ open, onToggle }) => {
  const { t } = useTranslation()
  return (
    <BaseButton
      onClick={onToggle}
      className={classNames(styles.container, open && styles.open)}
    >
      <span>{open ? t('button.showLess') : t('button.showMore')}</span>
      <ArrowDownIcon />
    </BaseButton>
  )
}

ExpandButton.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default ExpandButton
