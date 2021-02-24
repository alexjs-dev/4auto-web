import React, { memo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import styles from '../Input.module.scss'

const InputLabel = ({ label, isRequired, name, active, small, className }) => {
  if (!label) return null
  return (
    <div
      className={classNames(
        styles.inputLabelContainer,
        className,
        small && styles.small,
        active && styles.active
      )}
    >
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
  small: PropTypes.bool,
  name: PropTypes.string,
}

InputLabel.defaultProps = {
  label: null,
  small: false,
  className: null,
  isRequired: false,
}

export default memo(InputLabel)
