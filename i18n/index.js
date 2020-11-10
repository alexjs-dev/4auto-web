import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './translations/en.json'
import et from './translations/et.json'
import ru from './translations/ru.json'

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en,
    et,
    ru,
  },
  fallbackLng: 'en',
  ns: ['screens', 'image'],
  defaultNS: 'screens',
  fallbackNS: ['screens'],
  keySeparator: false,
  nsSeparator: '.',
})

export default i18n
