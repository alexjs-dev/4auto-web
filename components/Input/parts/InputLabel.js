import React, { memo, useState, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { FcQuestions, FcCancel } from 'react-icons/fc'
import { Button } from '~components'
import useOutsideClick from '~hooks/useOutsideClick'
import styles from '../Input.module.scss'

const InputLabel = ({
  label,
  isRequired,
  name,
  active,
  small,
  tooltip,
  className,
  onReset,
}) => {
  const [tooltipActive, setTooltipActive] = useState(false)
  const ref = useRef(null)
  useOutsideClick({ ref, isOpen: tooltipActive, setOpen: setTooltipActive })
  if (!label) return null
  return (
    <div
      ref={ref}
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
      {onReset && (
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onReset()
          }}
          type="button"
          className={styles.cancelButton}
        >
          <FcCancel />
        </button>
      )}
      {tooltip && (
        <button
          type="button"
          className={styles.tooltipButton}
          onClick={() => setTooltipActive(!tooltipActive)}
        >
          <FcQuestions size="20px" />
        </button>
      )}
      {tooltipActive && tooltip && (
        <span className={styles.tooltip}>{tooltip}</span>
      )}
    </div>
  )
}

InputLabel.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  small: PropTypes.bool,
  name: PropTypes.string,
  tooltip: PropTypes.string,
  onReset: PropTypes.any,
}

InputLabel.defaultProps = {
  label: null,
  small: false,
  className: null,
  tooltip: null,
  isRequired: false,
  onReset: null,
}

export default memo(InputLabel)
