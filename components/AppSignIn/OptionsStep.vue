<template>
  <div
    v-for="(option, index) in options"
    :key="option.label"
    class="relative bg-white rounded-[12px] px-[24px] py-[16px] cursor-pointer"
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
// Init component
const emit = defineEmits(['goToEmailStep'])

// Init hooks
const { t } = useI18n()

const clientId = import.meta.env.VITE_GOOGLE_SSO_CLIENT_ID
const siteAddress = import.meta.env.VITE_SITE_URL

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
        window.open(
          `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${siteAddress}&prompt=consent&response_type=code&client_id=${clientId}&scope=openid%20email%20profile&access_type=offline`,
          '_blank',
        )
      }
    },
  },
  // {
  //   label: 'Facebook',
  //   icon: '/icons/sign_in/facebook_icon.svg',
  //   onClick: () => {},
  // },
]
</script>
