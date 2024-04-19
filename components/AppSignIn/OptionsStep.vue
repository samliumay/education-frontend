<template>
  <div
    v-for="(option, index) in options"
    :key="option.label"
    class="relative bg-white rounded-[12px] px-[24px] py-[16px] cursor-pointer border-brand-light-gray border-[1px]"
    :class="{ 'mb-[12px]': index !== 3 }"
    @click="option.onClick()"
  >
    <img :src="option.icon" class="w-[25px] h-[25px]" alt="option.label" />
    <span
      class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 font-medium"
    >
      {{ option.label }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import normalizeUrl from 'normalize-url'

// Init component
const emit = defineEmits(['goToEmailStep'])

// Init hooks
const { t } = useI18n()

const appConfig = useAppConfig()

const { siteAddress } = appConfig
const googleClientId = appConfig.google.clientId
const facebookClientId = appConfig.facebook.clientId

const googleRedirectUri = normalizeUrl(`${siteAddress}?sso_provider=google`)
const facebookRedirectUri = normalizeUrl(`${siteAddress}?sso_provider=facebook`)

// Options
const options = [
  {
    label: t('common.info.mail'),
    icon: '/icons/sign_in/mail_icon.svg',
    onClick: () => emit('goToEmailStep'),
  },
  {
    label: 'Google',
    icon: '/icons/sign_in/google_icon.svg',
    onClick: () => {
      if (process.client) {
        const link = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleRedirectUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline`
        // eslint-disable-next-line no-console
        window.open(link, '_blank')
      }
    },
  },
  {
    label: 'Facebook',
    icon: '/icons/sign_in/facebook_icon.svg',
    onClick: () => {
      if (process.client) {
        const version = '13.0'
        const link = `https://www.facebook.com/v${version}/dialog/oauth?client_id=${facebookClientId}&redirect_uri=${facebookRedirectUri}&response_type=code&scope=email%20public_profile`
        // eslint-disable-next-line no-console
        window.open(link, '_blank')
      }
    },
  },
]
</script>
