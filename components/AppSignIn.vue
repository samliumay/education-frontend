<template>
  <n-modal :show="isOpen" @mask-click="close">
    <div class="bg-brand-light-gray rounded-lg p-[44px] w-[600px]">
      <div class="flex justify-between mb-[36px]">
        <h2 class="text-3xl font-medium">Войти</h2>
        <button
          class="bg-white border-[1px] border-brand-black w-[35px] h-[35px] rounded-full flex items-center justify-center hover:bg-brand-light-gray transition ease-in delay-100 transform active:scale-[0.93]"
          @click="close"
        >
          <img src="/icons/cross.svg" alt="close" class="w-[15px] h-[15px]" />
        </button>
      </div>

      <template v-if="step === LoginSteps.Options">
        <div
          v-for="(option, index) in options"
          :key="option.label"
          class="relative bg-white rounded-[12px] px-[24px] py-[16px] cursor-pointer"
          :class="{ 'mb-[12px]': index !== 3 }"
          @click="option.onClick()"
        >
          <img
            :src="option.icon"
            class="w-[25px] h-[25px]"
            alt="option.label"
          />
          <span
            class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 font-medium"
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
        <button class="mt-[16px]" @click="step = LoginSteps.RestorePassword">
          Забыли пароль?
          <span class="text-brand-red cursor-pointer">Восстановить</span>
        </button>
      </template>
      <template v-else-if="step === LoginSteps.RestorePassword">
        <AppInput v-model="credentials.email" placeholder="E-mail" />
        <button
          class="mt-[16px] text-brand-red cursor-pointer"
          @click="step = LoginSteps.Email"
        >
          Я вспомнил пароль
        </button>
      </template>

      <p v-if="error" class="text-brand-red mt-2 mb-2">{{ error }}</p>

      <AppButton
        v-if="step === LoginSteps.Email || step === LoginSteps.RestorePassword"
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

const error = ref('')
const clearError = () => {
  error.value = ''
}

const login = async () => {
  await userStore
    .login(credentials.value.email, credentials.value.password)
    .catch(err => {
      if (Object.keys(err).length !== 0) {
        error.value = 'Кажется что-то пошло не так'
        setTimeout(clearError, 2000)
      } else {
        emit('next')
        emit('close')
      }
    })
}

const step = ref(LoginSteps.Options)

const options = [
  {
    label: 'Почта',
    icon: '/icons/sign_in/mail_icon.svg',
    onClick: () => {
      step.value = LoginSteps.Email
    },
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

const close = () => {
  setTimeout(() => {
    step.value = LoginSteps.Options
    credentials.value.email = ''
    credentials.value.password = ''
  }, 250)
  emit('close')
}
</script>
