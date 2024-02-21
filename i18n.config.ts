import { de } from './locales/de'
import { en } from './locales/en'
import { ru } from './locales/ru'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  messages: {
    ru,
    en,
    de,
  },
}))
