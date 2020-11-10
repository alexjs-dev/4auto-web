import React from 'react'
import classNames from 'classnames'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import useViewport from '~hooks/useViewport'
import styles from './VehicleCardRibbons.module.scss'

const types = {
  urgent: 'urgent',
  recommended: 'recommended',
  featured: 'featured',
}

const VehicleCardRibbons = ({ visible, urgent, featured, recommended }) => {
  const { t } = useTranslation()
  const { isMobile } = useViewport()
  const getLabel = value => {
    const label = t(value)
    return isMobile ? label.substring(0, 1) : label
  }
  if (!visible) return null
  return (
    <div className={styles.ribbons}>
      {map(types, type => {
        if (type === types.urgent && !urgent) return null
        if (type === types.featured && !featured) return null
        if (type === types.recommended && !recommended) return null
        return (
          <span key={type} className={classNames(styles.ribbon, styles[type])}>
            {getLabel(type)}
          </span>
        )
      })}
    </div>
  )
}

VehicleCardRibbons.propTypes = {
  urgent: PropTypes.bool,
  featured: PropTypes.bool,
  recommended: PropTypes.bool,
  visible: PropTypes.bool,
}

VehicleCardRibbons.defaultProps = {
  urgent: false,
  featured: false,
  recommended: false,
  visible: true,
}

export default VehicleCardRibbons
