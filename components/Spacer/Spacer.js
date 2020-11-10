import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from './Spacer.module.scss'

const Spacer = ({ className }) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(styles.container, className)}>
      <span>{t('label.or')}</span>
    </div>
  )
}

Spacer.propTypes = {
  className: PropTypes.string,
}

Spacer.defaultProps = {
  className: null,
}

export default Spacer
