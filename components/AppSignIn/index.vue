<template>
  <n-modal :show="isOpen" @mask-click="close">
    <div
      class="bg-brand-light-gray rounded-lg p-[44px] md:left-auto modal-width"
    >
      <div
        class="flex mb-[36px]"
        :class="
          step === LoginSteps.VerifyEmail ? 'justify-end' : 'justify-between'
        "
      >
        <h2
          v-if="step !== LoginSteps.VerifyEmail"
          class="text-[28px] md:text-[36px] font-medium"
        >
          <span v-if="step === LoginSteps.SignUp">{{
            $t('user.registration')
          }}</span>
          <span
            v-else-if="
              step === LoginSteps.RestorePassword ||
              step === LoginSteps.ConfirmRestorePassword
            "
            >{{ $t('user.passwordRestore') }}</span>
          <span v-else>{{ $t('common.actions.signIn') }}</span>
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
        @go-to-verify="goToVerify"
        @close="close"
      />
      <ConfirmRestorePasswordStep
        v-else-if="step === LoginSteps.ConfirmRestorePassword"
        @close="step = LoginSteps.Email"
      />
      <VerifyEmailStep
        v-else-if="step === LoginSteps.VerifyEmail"
        :email="savedEmail"
        @close="close"
      />
    </div>
  </n-modal>
</template>
<script lang="ts" setup>
import { NModal } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { LoginSteps } from '../../types'
import ConfirmRestorePasswordStep from './ConfirmRestorePasswordStep.vue'
import EmailStep from './EmailStep.vue'
import OptionsStep from './OptionsStep.vue'
import RestorePasswordStep from './RestorePasswordStep.vue'
import SignUpStep from './SignUpStep.vue'
import VerifyEmailStep from './VerifyEmailStep.vue'

// Init
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

// State
const step = ref(LoginSteps.Options)
const savedEmail = ref('')

const route = useRoute()

// Actions
const close = () => {
  setTimeout(() => {
    step.value = LoginSteps.Options
  }, 250)
  emit('close')
}

const goToVerify = (email: string) => {
  savedEmail.value = email
  step.value = LoginSteps.VerifyEmail
}

onMounted(() => {
  if (route.query.uid && route.query.token) {
    step.value = LoginSteps.ConfirmRestorePassword
  }
})
</script>
<style scoped>
.modal-width {
  width: 600px;

  @media screen and (max-width: 769px) {
    width: calc(100% - 20px);
  }
}
</style>
