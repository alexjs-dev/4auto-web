import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LogoCropIcon from '~public/logo-crop.svg'
import styles from './Loader.module.scss'

const Branded = ({ centered, className, fullscreen, invert }) => {
  return (
    <div
      className={classNames(
        className,
        styles.container,
        centered && 'centeredLoader',
        fullscreen && 'fullScreenLoader'
      )}
    >
      <LogoCropIcon />
      <div className={classNames('loader', invert && 'invertLoader')} />
    </div>
  )
}

const Loader = (props) => {
  const { loading, centered, fullscreen, invert, className, isBranded } = props
  if (!loading) return null
  if (isBranded) return <Branded {...props} />
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
  isBranded: PropTypes.bool,
}

Loader.defaultProps = {
  loading: false,
  centered: false,
  invert: false,
  fullscreen: false,
  isBranded: false,
  className: null,
}

export default memo(Loader)
