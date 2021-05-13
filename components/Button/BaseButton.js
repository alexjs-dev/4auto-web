/* eslint-disable react/button-has-type */
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import classNames from 'classnames'
import { Loader } from '~components'
import styles from './Button.module.scss'

const BaseButton = forwardRef(
  (
    {
      onClick,
      event,
      eventProps,
      disabled,
      className,
      children,
      href,
      isInternalLink,
      loading,
      internalLinkProps,
      baseType,
      loadingInverted,
      visible,
      haptic,
      ...rest
    },
    ref
  ) => {
    if (!visible) return null
    const handleOnClick = (e) => {
      if (disabled) return
      if (baseType === 'submit') e.preventDefault()
      onClick(e)
      if (haptic && window) window?.navigator?.vibrate(100)
    }

    // make sure our buttons and links behave the same way, when using the keyboard
    const handleKeyPress = (e) => {
      if (disabled) return
      const { key } = e
      if (key === 'Enter' || e.charCode === 13) handleOnClick(e)
      if (haptic && window) window?.navigator?.vibrate(100)
    }

    // Internal links need to be wrapped with next/Link
    if (href && (isInternalLink || internalLinkProps)) {
      const linkProps = internalLinkProps || {}
      return (
        <Link href={href} shallow {...linkProps}>
          <a
            onClick={handleOnClick}
            role="button"
            onKeyPress={handleKeyPress}
            tabIndex="0"
            className={classNames(styles.button, className)}
            ref={ref}
            {...rest}
          >
            {loading ? <Loader loading invert={loadingInverted} /> : children}
          </a>
        </Link>
      )
    }
    // For external links we just use the anchor tag, with target="_blank"
    if (href) {
      return (
        <a
          onClick={handleOnClick}
          role="button"
          onKeyPress={handleKeyPress}
          tabIndex="0"
          href={href}
          target="_blank"
          className={classNames(styles.button, className)}
          rel="noreferrer noopener"
          ref={ref}
          {...rest}
        >
          {loading ? <Loader loading invert={loadingInverted} /> : children}
        </a>
      )
    }
    // For clickables that are not links, we use a button
    return (
      <button
        {...rest}
        className={classNames(styles.button, className)}
        type={baseType}
        onClick={handleOnClick}
        onKeyPress={handleKeyPress}
        ref={ref}
      >
        {loading ? <Loader loading invert={loadingInverted} /> : children}
      </button>
    )
  }
)

BaseButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.any,
  event: PropTypes.string,
  baseType: PropTypes.string,
  eventProps: PropTypes.shape(),
  internalLinkProps: PropTypes.shape(),
  href: PropTypes.string,
  isInternalLink: PropTypes.bool,
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  loadingInverted: PropTypes.bool, // invert color
  className: PropTypes.string,
  haptic: PropTypes.bool,
}

BaseButton.defaultProps = {
  children: null,
  event: null,
  eventProps: null,
  loadingInverted: false,
  baseType: 'button',
  disabled: false,
  onClick: () => {},
  className: null,
  href: null,
  isInternalLink: false,
  loading: false,
  visible: true,
  internalLinkProps: null,
  haptic: false,
}

export default BaseButton
