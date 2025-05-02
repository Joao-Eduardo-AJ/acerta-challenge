import { setLocale } from 'yup'
import i18n from '../config'

const { t } = i18n

setLocale({
  mixed: {
    default: t('yup.MIXED_DEFAULT'),
    required: t('yup.MIXED_REQUIRED'),
    oneOf: t('yup.ONE_OF')
  },
  string: {
    email: () => t('yup.STRING_EMAIL'),
    max: ({ max }) => `${t('yup.STRING_MAX')} ${max} ${t('yup.CHARACTERS')}`,
    min: ({ min }) => `${t('yup.STRING_MIN')} ${min} ${t('yup.CHARACTERS')}`,
    length: ({ length }) =>
      `${t('yup.STRING_MAX')} ${length} ${t('yup.CHARACTERS')}`,
    matches: () => `${t('yup.MATCHES')}`
  },
  date: {
    max: ({ max }) => `${t('yup.DATE_MAX')} ${max}`,
    min: ({ min }) => `${t('yup.DATE_MIN')} ${min}`
  },
  number: {
    integer: () => t('yup.NUMBER_INTEGER'),
    negative: () => t('yup.NUMBER_NEGATIVE'),
    positive: () => t('yup.NUMBER_POSITIVE'),
    moreThan: ({ more }) => `${t('yup.NUMBER_BIGGER_THAN')} ${more}`,
    lessThan: ({ less }) => `${t('yup.NUMBER_SMALLER_THAN')} ${less}`,
    min: ({ min }) => `${t('yup.NUMBER_MIN')} ${min}  ${t('yup.CHARACTERS')}`,
    max: ({ max }) => `${t('yup.NUMBER_MAX')}  ${max}  ${t('yup.CHARACTERS')}`
  },
  boolean: {},
  object: {},
  array: {}
})
