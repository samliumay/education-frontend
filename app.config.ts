const requireEnvConfig = varName => {
  if (!process.browser && !import.meta.env[varName]) {
    throw new Error(`${varName} is not found in build environment`)
  }
  return import.meta.env[varName]
}

export default defineAppConfig({
  paypal: {
    clientId: requireEnvConfig('VITE_PAYPAL_CLIENT_ID'),
    disableFunding: 'credit,card',
    currency: 'EUR',
  },
  google: {
    clientId: requireEnvConfig('VITE_GOOGLE_SSO_CLIENT_ID'),
  },
  facebook: {
    clientId: requireEnvConfig('VITE_FACEBOOK_SSO_CLIENT_ID'),
  },
  siteAddress: requireEnvConfig('VITE_SITE_URL'),
})
