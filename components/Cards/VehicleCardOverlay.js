import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { FiX as CloseIcon } from 'react-icons/fi'
import { BaseButton } from '~components'
import styles from './VehicleCardOverlay.module.scss'

const VehicleCardOverlay = ({ visible, onClose, children }) => {
  if (!visible) return null
  return (
    <div className={classNames(styles.container)}>
      <BaseButton className={styles.closeButton} onClick={onClose}>
        <CloseIcon />
      </BaseButton>
      {children}
    </div>
  )
}

VehicleCardOverlay.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
}

VehicleCardOverlay.defaultProps = {
  visible: true,
  children: null,
}

export default VehicleCardOverlay
