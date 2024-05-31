import { computed } from 'vue'

export const languageOptionsByLocale = (t: (arg0: string) => string) =>
  computed(() => [
    {
      label: t('common.languages.ru'),
      value: 'ru',
    },
    {
      label: t('common.languages.en'),
      value: 'en',
    },
    {
      label: t('common.languages.de'),
      value: 'de',
    },
    {
      label: t('common.languages.bi'),
      value: 'bi',
    },
    {
      label: t('common.languages.ru/en'),
      value: 'ru-en',
    },
    {
      label: t('common.languages.de/en'),
      value: 'de-en',
    },
    {
      label: t('common.languages.de/ru'),
      value: 'de-ru',
    },
  ])

export const ageOptionsByLocale = (t: (arg0: string) => string) =>
  computed(() => [
    {
      label: t('common.ages.5-7'),
      value: '5-7',
    },
    {
      label: t('common.ages.8-11'),
      value: '8-11',
    },
    {
      label: t('common.ages.10+'),
      value: '10+',
    },
    {
      label: t('common.ages.12+'),
      value: '12+',
    },
    {
      label: t('common.ages.14+'),
      value: '14+',
    },
  ])

export const seasonsOptionsByLocale = (t: (arg0: string) => string) =>
  computed(() => [
    {
      label: t('common.filters.seasons.winter'),
      value: 'Winter',
    },
    {
      label: t('common.filters.seasons.spring'),
      value: 'Spring',
    },
    {
      label: t('common.filters.seasons.summer'),
      value: 'Summer',
    },
    {
      label: t('common.filters.seasons.autumn'),
      value: 'Autumn',
    },
  ])
