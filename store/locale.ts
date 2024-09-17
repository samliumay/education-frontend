// stores/localeStore.ts
import { defineStore } from 'pinia'
import { LOCALE_KEY } from '@/constants/localStorage'

interface LocaleState {
  currentLocale: string;
}

export const useLocaleStore = defineStore(LOCALE_KEY, {
  state: (): LocaleState => ({
    currentLocale: localStorage.getItem(LOCALE_KEY) || 'ru',
  }),
  actions: {
    setLocale(locale: string) {
      this.currentLocale = locale;
      localStorage.setItem(LOCALE_KEY, locale);
    },
  },
});
