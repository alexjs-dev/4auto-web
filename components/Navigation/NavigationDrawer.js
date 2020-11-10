import React from 'react'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import styles from './NavigationDrawer.module.scss'
import LogoWhite from '~public/logo-white.svg'
import NavigationContent from './NavigationContent'
import config from '~config'
import EnglishIcon from '~public/icons/language/us.svg'
import EstonianIcon from '~public/icons/language/et.svg'
import RussianIcon from '~public/icons/language/ru.svg'
import { BaseDrawer, BaseButton } from '~components'

const { langType } = config

const languages = {
  [langType.en]: {
    locale: [langType.en],
    icon: <EnglishIcon />,
  },
  [langType.et]: {
    locale: [langType.et],
    icon: <EstonianIcon />,
  },
  [langType.ru]: {
    locale: [langType.ru],
    icon: <RussianIcon />,
  },
}

const NavigationDrawer = () => {
  const { i18n } = useTranslation()
  const { language = 'en' } = i18n
  return (
    <BaseDrawer>
      <div className={styles.drawer}>
        <BaseButton href="/" isInternalLink className={styles.logo}>
          <LogoWhite />
        </BaseButton>
        <NavigationContent className={styles.option} fontSize={36} />
      </div>
      <div className={styles.languages}>
        {map(languages, (lang, key) => {
          const active = key === language
          return (
            <BaseButton
              key={key}
              className={classNames(
                styles.languageOption,
                active && styles.active
              )}
              onClick={() => i18n.changeLanguage(key)}
            >
              {lang.icon}
            </BaseButton>
          )
        })}
      </div>
    </BaseDrawer>
  )
}

export default NavigationDrawer
