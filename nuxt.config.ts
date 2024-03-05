import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-svgo',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    'nuxt-simple-robots',
    'nuxt-paypal',
    ...(process.env.NODE_ENV === 'production' ? ['@nuxtjs/eslint-module'] : []),
  ],
  alias: {
    '@': path.resolve(__dirname, './'),
  },
  paypal: {
    clientId:
      process.env.PAYPAL_CLIENT_ID ||
      'AYfXh9LscHuwUGMImNtDNDmFIujKTzhaO6Tho46Fq212YLyAN0lMALq7dicz8sPathrGwP_zNg5inN8P',
    disableFunding: 'credit,card',
    currency: 'EUR',
  },
  css: ['@/assets/styles/fonts.css'],
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'maska,',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
            'vue3-google-map',
          ]
        : ['@juggle/resize-observer'],
  },
  runtimeConfig: {
    public: {
      sentry: {
        dsn:
          process.env.NODE_ENV === 'production'
            ? process.env.SENTRY_DSN_PRODUCTION
            : process.env.SENTRY_DSN_DEVELOPMENT,
        environment: process.env.NODE_ENV,
      },
    },
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'maska', 'date-fns-tz/formatInTimeZone']
          : [],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
  },
})
