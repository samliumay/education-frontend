import { de } from "./assets/translations/de"
import { en } from "./assets/translations/en"

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "de-DE",
  messages: {
    "en-US": en,
    "de-DE": de,
  },
}))
