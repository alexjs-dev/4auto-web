import React from 'react'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import useViewport from '~hooks/useViewport'
import styles from './NavigationDrawer.module.scss'
import LogoWhite from '~public/logo-white.svg'
import NavigationContent from './NavigationContent'
import config from '~config'
import EnglishIcon from '~public/icons/language/us.svg'
import EstonianIcon from '~public/icons/language/et.svg'
import RussianIcon from '~public/icons/language/ru.svg'
import { BaseDrawer, BaseButton, LanguageList } from '~components'

const NavigationDrawer = () => {
  const { isMobile } = useViewport()
  if (!isMobile) {
    return null;
  }
  return (
    <BaseDrawer>
      <div className={styles.drawer}>
        <BaseButton href="/" isInternalLink className={styles.logo}>
          <LogoWhite />
        </BaseButton>
        <NavigationContent className={styles.option} fontSize={36} />
      </div>
      <LanguageList />
    </BaseDrawer>
  )
}

export default NavigationDrawer
