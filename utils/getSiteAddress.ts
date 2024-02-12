export const getSiteAddress = () =>
  import.meta.env.DEV
    ? import.meta.env.VITE_SITE_URL_DEVELOPMENT
    : import.meta.env.VITE_SITE_URL_PRODUCTION
