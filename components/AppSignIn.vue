<template>
  <AppModal :is-open="isOpen">
    <div class="bg-gray-200 rounded-[20px] p-[44px]">
      <div class="flex justify-between mb-[36px]">
        Войти
        <CloseIcon />
      </div>
      <template v-if="step === LoginSteps.Options">
        <div
          v-for="(option, index) in options"
          :key="option.label"
          class="relative bg-white rounded-[12px] px-[24px] py-[16px]"
          :class="{ 'mb-[12px]': index !== 3 }"
          @click="option.onClick"
        >
          <option.icon />
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
        />
      </template>
      <p class="mt-[16px]">
        У меня нет аккаунта.
        <span class="text-blue-500" @click="$emit('next')">Продолжить</span>
      </p>
      <AppButton
        v-if="step === LoginSteps.Email"
        class="block mt-[52px] w-full"
        @click="$emit('next')"
      >
        Войти
      </AppButton>
    </div>
  </AppModal>
</template>
<script lang="ts" setup>
import { ref } from "vue"

import CloseIcon from "../assets/icons/Close.svg"
import { LoginSteps } from "../types"
import AppButton from "./AppButton.vue"
import AppInput from "./AppInput.vue"
import AppModal from "./AppModal.vue"

defineProps<{
  isOpen: boolean;
}>()

defineEmits(["close", "next"])

const credentials = ref({
  email: "",
  password: "",
})

const step = ref(LoginSteps.Options)

const options = [
  {
    label: "Почта",
    icon: CloseIcon,
    onclick: () => {
      step.value = LoginSteps.Email
    },
  },
  {
    label: "Почта",
    icon: CloseIcon,
    onClick: () => {},
  },
  {
    label: "Почта",
    icon: CloseIcon,
    onClick: () => {},
  },
  {
    label: "Почта",
    icon: CloseIcon,
    onClick: () => {},
  },
]
</script>
