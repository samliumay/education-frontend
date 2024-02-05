<template>
  <n-modal :show="isOpen" @mask-click="close">
    <div class="bg-brand-light-gray rounded-lg p-[44px] md:left-auto md:w-[600px] w-[90%]">
      <div class="flex justify-between mb-[36px]">
        <h2 class="text-3xl font-medium">
          <span v-if="step === LoginSteps.SignUp">Регистрация</span>
          <span
            v-else-if="
              step === LoginSteps.RestorePassword ||
              step === LoginSteps.ConfirmRestorePassword
            "
            >Восстановление пароля</span>
          <span v-else>Войти</span>
        </h2>
        <button
          class="bg-white border-[1px] border-brand-black w-[35px] h-[35px] rounded-full flex items-center justify-center hover:bg-brand-light-gray transition ease-in delay-100 transform active:scale-[0.93]"
          @click="close"
        >
          <img src="/icons/cross.svg" alt="close" class="w-[15px] h-[15px]" />
        </button>
      </div>

      <OptionsStep
        v-if="step === LoginSteps.Options"
        @go-to-email-step="step = LoginSteps.Email"
      />
      <EmailStep
        v-else-if="step === LoginSteps.Email"
        @close="close"
        @go-to-restore-password-step="step = LoginSteps.RestorePassword"
        @go-to-sign-up-step="step = LoginSteps.SignUp"
      />
      <RestorePasswordStep
        v-else-if="step === LoginSteps.RestorePassword"
        @go-to-email-step="step = LoginSteps.Email"
      />
      <SignUpStep
        v-else-if="step === LoginSteps.SignUp"
        @go-to-email-step="step = LoginSteps.Email"
      />
      <ConfirmRestorePasswordStep
        v-else-if="step === LoginSteps.ConfirmRestorePassword"
        @close="close"
      />
    </div>
  </n-modal>
</template>
<script lang="ts" setup>
import { NModal } from 'naive-ui'
import { ref } from 'vue'

import { LoginSteps } from '../../types'
import ConfirmRestorePasswordStep from './ConfirmRestorePasswordStep.vue'
import EmailStep from './EmailStep.vue'
import OptionsStep from './OptionsStep.vue'
import RestorePasswordStep from './RestorePasswordStep.vue'
import SignUpStep from './SignUpStep.vue'

// Init
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

// State
const step = ref(LoginSteps.Options)

// Actions
const close = () => {
  setTimeout(() => {
    step.value = LoginSteps.Options
  }, 250)
  emit('close')
}
</script>
