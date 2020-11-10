import React from 'react'
import { useTranslation } from 'react-i18next'
import LogoIcon from '~public/logo.svg'
import styles from './LogoAbstract.module.scss'

const LogoAbstract = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className={styles.moto}>
        <LogoIcon />
        <p>{t('moto.buyingAndSelling')}</p>
        <p>
          <span className={styles.bold}>{t('moto.cars')}</span>
          <span>&nbsp;{t('moto.made')}&nbsp;</span>
          <span className={styles.primary}>{t('moto.easy')}</span>
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.logo} />
      </div>
    </>
  )
}

export default LogoAbstract
