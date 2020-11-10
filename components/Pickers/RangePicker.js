import React from 'react'
import PropTypes from 'prop-types'
import styles from './RangePicker.module.scss'
import { Input } from '~components'

const RangePicker = ({
  name,
  minLabel,
  minVal,
  maxVal,
  minPlaceholder,
  maxLabel,
  maxPlaceholder,
}) => {
  if (!name) return null
  return (
    <div className={styles.container}>
      <Input
        name={`${name}.min`}
        type="number"
        label={minLabel}
        placeholder={minPlaceholder}
        min={minVal}
        max={maxVal}
      />
      <div className={styles.divider}>
        <div className={styles.line} />
      </div>
      <Input
        name={`${name}.max`}
        type="number"
        label={maxLabel}
        placeholder={maxPlaceholder}
        min={minVal}
        max={maxVal}
      />
    </div>
  )
}

RangePicker.propTypes = {
  name: PropTypes.string,
  minLabel: PropTypes.string,
  minVal: PropTypes.number,
  maxVal: PropTypes.number,
  minPlaceholder: PropTypes.string,
  maxLabel: PropTypes.string,
  maxPlaceholder: PropTypes.string,
}

RangePicker.defaultProps = {
  name: null,
  minLabel: '',
  minVal: 0,
  maxVal: null,
  minPlaceholder: '',
  maxLabel: '',
  maxPlaceholder: '',
}

export default RangePicker
