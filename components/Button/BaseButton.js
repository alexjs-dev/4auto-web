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
      ...rest
    },
    ref
  ) => {
    if (!visible) return null
    const handleOnClick = e => {
      if (baseType === 'submit') e.preventDefault()
      onClick(e)
    }

    // make sure our buttons and links behave the same way, when using the keyboard
    const handleKeyPress = e => {
      const { key } = e
      if (key === 'Enter' || e.charCode === 13) handleOnClick(e)
    }

    const Children = () => {
      if (loading) {
        return <Loader loading invert={loadingInverted} />
      }
      return children
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
            <Children />
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
          <Children />
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
        <Children />
      </button>
    )
  }
)

BaseButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
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
}

export default BaseButton
