import React, { useState, useRef } from 'react'
import { map, slice, find } from 'lodash'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { FiXCircle as DisabledIcon } from 'react-icons/fi'
import ArrowDownIcon from '~public/icons/arrow-down.svg'
import useOutsideClick from '~hooks/useOutsideClick'
import { BaseButton } from '~components'
import { colorTypes, colorCodes } from '~consts/vehicle'
import InputLabel from '../Input/parts/InputLabel'
import styles from './ColorPicker.module.scss'

const colors = map(colorTypes, (color) => ({
  key: color,
  color: colorCodes[color],
}))

const BaseColorPicker = ({ input, label, visibleColors, allowEmpty }) => {
  const ref = useRef(null)

  const setActive = (key) => {
    if (input.onChange) input.onChange(key)
  }

  const [open, setOpen] = useState(false)
  const baseColors = slice(colors, 0, visibleColors)
  const extraColors = slice(colors, visibleColors, colors.length)
  const activeSecondary = find(extraColors, ({ key }) => key === input.value)

  useOutsideClick({ ref, isOpen: open, setOpen })

  const ColorSwatch = ({ value, color }) => (
    <BaseButton
      onClick={() => setActive(value)}
      style={{
        borderColor:
          // eslint-disable-next-line no-nested-ternary
          input.value === value
            ? value === colorTypes.white
              ? '#e0e0e0'
              : color
            : 'transparent',
      }}
      className={styles.colorContainer}
    >
      <div className={styles.color} style={{ backgroundColor: color }} />
    </BaseButton>
  )

  ColorSwatch.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }
  return (
    <div className={styles.container}>
      {label && <InputLabel label={label} name={name} />}
      <div className={styles.swatch} ref={ref}>
        {allowEmpty && (
          <BaseButton
            onClick={() => setActive(null)}
            className={classNames(
              styles.emptyButton,
              !input.value && styles.activeEmpty
            )}
          >
            <DisabledIcon size="24px" />
          </BaseButton>
        )}
        {map(baseColors, ({ key, ...rest }) => (
          <ColorSwatch key={key} value={key} {...rest} />
        ))}
        {activeSecondary && (
          <div
            style={{
              borderColor: activeSecondary.color,
            }}
            className={styles.colorContainer}
          >
            <div
              className={styles.color}
              style={{ backgroundColor: activeSecondary.color }}
            />
          </div>
        )}
        <BaseButton
          onClick={() => setOpen(!open)}
          className={classNames(styles.arrowIcon, open && styles.active)}
        >
          <ArrowDownIcon />
        </BaseButton>
        {open && (
          <div className={styles.dropdown}>
            {map(extraColors, ({ key, ...rest }) => (
              <ColorSwatch key={key} value={key} {...rest} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

BaseColorPicker.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
  visibleColors: PropTypes.number.isRequired,
  allowEmpty: PropTypes.bool,
  label: PropTypes.string,
}

const ColorPicker = ({ name, visibleColors, allowEmpty, label }) => {
  if (!name) return null
  return (
    <Field
      name={name}
      component={BaseColorPicker}
      props={{
        name,
        visibleColors,
        allowEmpty,
        label,
      }}
    />
  )
}

ColorPicker.propTypes = {
  name: PropTypes.string.isRequired,
  allowEmpty: PropTypes.bool,
  visibleColors: PropTypes.number,
  label: PropTypes.string,
}

ColorPicker.defaultProps = {
  visibleColors: 3,
  allowEmpty: false,
  label: null,
}

export default ColorPicker
