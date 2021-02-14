import React, { ReactChild, ReactChildren } from 'react'
import classNames from 'classnames'
import styles from './Layout.module.scss'

type Props = {
  children: ReactChild | ReactChildren | JSX.Element[]
  background?: 'gray' | 'white'
  fullscreen?: boolean
  className?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  background,
  fullscreen,
  className,
}) => {
  const getBackground = () => {
    const color = (background && background) || 'white'
    switch (color) {
      case 'gray':
        return styles.gray
      case 'white':
      default:
        return null
    }
  }
  return (
    <div
      className={classNames(
        styles.container,
        getBackground(),
        fullscreen && styles.fullscreen,
        className
      )}
    >
      {children}
    </div>
  )
}

export default Layout
