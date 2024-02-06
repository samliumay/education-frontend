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
const emit = defineEmits(['goToEmailStep'])

const { t } = useI18n()

const options = [
  {
    label: t('common.info.mail'),
    icon: '/icons/sign_in/mail_icon.svg',
    onClick: () => emit('goToEmailStep'),
  },
  {
    label: 'Google',
    icon: '/icons/sign_in/google_icon.svg',
    onClick: () => {},
  },
  {
    label: 'Apple',
    icon: '/icons/sign_in/apple_icon.svg',
    onClick: () => {},
  },
  {
    label: 'Facebook',
    icon: '/icons/sign_in/facebook_icon.svg',
    onClick: () => {},
  },
]
</script>
