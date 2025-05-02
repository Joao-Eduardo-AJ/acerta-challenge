import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en_US from './en/en_US.json'
import pt_BR from './pt/pt_BR.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': { translation: en_US },
      'pt-BR': { translation: pt_BR }
    },
    fallbackLng: 'en-US',
    supportedLngs: ['en-US', 'pt-BR'],
    detection: {
      order: ['navigator']
    }
  })

export default i18n
