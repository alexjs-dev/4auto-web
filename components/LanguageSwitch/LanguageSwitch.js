import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import config from '~config'
import EnglishIcon from '~public/icons/language/us.svg'
import EstonianIcon from '~public/icons/language/et.svg'
import RussianIcon from '~public/icons/language/ru.svg'
import CheckIcon from '~public/icons/check.svg'
import useOutsideClick from '~hooks/useOutsideClick'
import { BaseButton } from '~components'
import styles from './LanguageSwitch.module.scss'

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

const Drawer = React.memo(() => {
  const { i18n } = useTranslation()
  const { language = 'en' } = i18n
  return (
    <div className={styles.drawer}>
      {map(languages, (lang, key) => {
        const active = key === language
        return (
          <BaseButton
            key={key}
            className={styles.option}
            onClick={() => i18n.changeLanguage(key)}
          >
            <div className={styles.check}>{active && <CheckIcon />}</div>
            {lang.icon}
          </BaseButton>
        )
      })}
    </div>
  )
})

const LanguageSwitch = ({ className }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { i18n } = useTranslation()
  const { language = 'en' } = i18n
  useOutsideClick({ ref, isOpen: open, setOpen })
  if (!open) return null
  return (
    <div className={classNames(styles.container, className)} ref={ref}>
      <BaseButton onClick={() => setOpen(!open)}>
        {languages[language].icon}
      </BaseButton>
      <Drawer />
    </div>
  )
}

export default LanguageSwitch
