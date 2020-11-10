import React, { memo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import styles from '../Input.module.scss'

const InputLabel = ({ label, isRequired, name, className }) => {
  if (!label) return null
  return (
    <div className={classNames(styles.inputLabelContainer, className)}>
      <label htmlFor={name}>
        <span>{label}</span>
        {isRequired && <span className={styles.required}>&nbsp;*</span>}
      </label>
    </div>
  )
}

InputLabel.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
}

InputLabel.defaultProps = {
  label: null,
  className: null,
  isRequired: false,
}

export default memo(InputLabel)
