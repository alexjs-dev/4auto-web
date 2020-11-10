import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Loader = ({ loading, centered, fullscreen, invert, className }) => {
  if (!loading) return null
  return (
    <div
      className={classNames(
        'loader',
        className,
        centered && 'centeredLoader',
        fullscreen && 'fullScreenLoader',
        invert && 'invertLoader'
      )}
    />
  )
}

Loader.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  centered: PropTypes.bool,
  invert: PropTypes.bool, // invert colors
  fullscreen: PropTypes.bool,
}

Loader.defaultProps = {
  loading: false,
  centered: false,
  invert: false,
  fullscreen: false,
  className: null,
}

export default memo(Loader)
