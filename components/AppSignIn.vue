<template>
  <n-modal :show="isOpen" @close="$emit('close')">
    <div class="bg-gray-200 rounded-[20px] p-[44px] w-[400px]">
      <div class="flex justify-between mb-[36px]">
        Войти
        <CloseIcon @click="$emit('close')" />
      </div>
      <template v-if="step === LoginSteps.Options">
        <div
          v-for="(option, index) in options"
          :key="option.label"
          class="relative bg-white rounded-[12px] px-[24px] py-[16px] cursor-pointer"
          :class="{ 'mb-[12px]': index !== 3 }"
          @click="option.onClick()"
        >
          <MailIcon v-if="option.label === 'Почта'" />
          <GoogleIcon v-if="option.label === 'Google'" />
          <AppleIcon v-if="option.label === 'Apple'" />
          <FacebookIcon v-if="option.label === 'Facebook'" />
          <span
            class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
          >
            {{ option.label }}
          </span>
        </div>
      </template>
      <template v-else-if="step === LoginSteps.Email">
        <AppInput v-model="credentials.email" placeholder="E-mail" />
        <AppInput
          v-model="credentials.password"
          placeholder="Пароль"
          type="password"
          class="mt-[12px]"
        />
      </template>
      <p class="mt-[16px]">
        Забыли пароль?
        <span class="text-blue-500 cursor-pointer">Восстановить</span>
      </p>
      <AppButton
        v-if="step === LoginSteps.Email"
        class="block mt-[36px] w-full"
        @click="login"
      >
        Войти
      </AppButton>
    </div>
  </n-modal>
</template>
<script lang="ts" setup>
import { NModal } from 'naive-ui'
import { ref } from 'vue'

import CloseIcon from '../public/icons/close.svg'
import AppleIcon from '../public/icons/sign_in/apple_icon.svg'
import FacebookIcon from '../public/icons/sign_in/facebook_icon.svg'
import GoogleIcon from '../public/icons/sign_in/google_icon.svg'
import MailIcon from '../public/icons/sign_in/mail_icon.svg'
import { useUserStore } from '../store/user'
import { LoginSteps } from '../types'
import AppButton from './AppButton.vue'
import AppInput from './AppInput.vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'next'])

const userStore = useUserStore()

const credentials = ref({
  email: '',
  password: '',
})

const login = async () => {
  await userStore
    .login(credentials.value.email, credentials.value.password)
    .then(() => emit('next'))
}

const step = ref(LoginSteps.Options)

const options = [
  {
    label: 'Почта',
    icon: CloseIcon,
    onClick: () => {
      step.value = LoginSteps.Email
    },
  },
  {
    label: 'Google',
    icon: GoogleIcon,
    onClick: () => {},
  },
  {
    label: 'Apple',
    icon: AppleIcon,
    onClick: () => {},
  },
  {
    label: 'Facebook',
    icon: FacebookIcon,
    onClick: () => {},
  },
]
</script>
