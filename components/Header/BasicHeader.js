import React from 'react'
import LogoIcon from '~public/logo.svg'
import BaseButton from '~components/Button/BaseButton'
import styles from './BasicHeader.module.scss'

const BasicHeader = () => {
  return (
    <header className={styles.container}>
      <BaseButton href="/" isInternalLink>
        <LogoIcon />
      </BaseButton>
    </header>
  )
}

export default BasicHeader
