import React from 'react'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import styles from './LanguageList.module.scss'
import config from '~config'
import EnglishIcon from '~public/icons/language/us.svg'
import EstonianIcon from '~public/icons/language/et.svg'
import RussianIcon from '~public/icons/language/ru.svg'
import { BaseButton } from '~components'

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

const LanguageList = () => {
  const { i18n } = useTranslation()
  const { language = 'en' } = i18n
  return (
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
  )
}

export default LanguageList
