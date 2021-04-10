import React from 'react'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BaseButton from './BaseButton'
import styles from './Button.module.scss'

class Button extends React.PureComponent {
  static types = {
    PRIMARY: 'primary',
    GHOST: 'ghost',
  }

  static colors = {
    PRIMARY: 'green',
    WHITE: 'white',
    RED: 'red',
  }

  styleIconButton = () => {
    const { label, icon } = this.props
    if (!label && icon) return styles.iconOnly
    return null
  }

  Content = () => {
    const { label, children } = this.props
    if (children) return children
    return label
  }

  Icon = () => {
    const { icon } = this.props
    if (icon)
      return <img key="icon" className={styles.icon} alt="logo" src={icon} />
    return null
  }

  generateButtonStyle = () => {
    const { className, type, loading, fluid, color, disabled } = this.props
    return classNames(
      styles.base,
      className,
      styles[type],
      styles[color],
      loading && styles.loading,
      fluid && styles.fluid,
      disabled && styles.disabled,
      this.styleIconButton()
    )
  }

  render = () => {
    const { label, visible, loading, type, ...buttonProps } = this.props
    if (!visible) return null
    const { Icon, Content } = this
    return (
      <BaseButton
        {...omit(buttonProps, ['fluid'])}
        loading={loading}
        loadingInverted={type !== Button.types.GHOST}
        className={this.generateButtonStyle()}
      >
        <Icon />
        <Content />
      </BaseButton>
    )
  }
}

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.oneOf(['primary', 'ghost']),
  color: PropTypes.oneOf(['green', 'white', 'red']),
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fluid: PropTypes.bool,
  haptic: PropTypes.bool,
  children: PropTypes.node,
}

Button.defaultProps = {
  label: '',
  className: '',
  visible: true,
  disabled: false,
  fluid: false, // 100% width
  type: 'primary',
  color: 'green',
  icon: '',
  haptic: false, // add vibration to mobiles on click
  loading: false,
  children: null,
}

export default Button
