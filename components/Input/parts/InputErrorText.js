/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from '../Input.module.scss'

const InputErrorText = ({ error }) => {
  const { t } = useTranslation()
  if (!error) return null
  return <label className={styles.labelError}>{t(error)}</label>
}

InputErrorText.propTypes = {
  error: PropTypes.string,
}

InputErrorText.defaultProps = {
  error: null,
}

export default memo(InputErrorText)
