<template>
  <form ref="form" @submit.prevent="login" @enter.prevent="login">
    <AppInput
      v-model="credentials.email"
      placeholder="E-mail"
      type="email"
      required
      @blur="checkValidity"
    />
    <AppInput
      v-model="credentials.password"
      :placeholder="$t('user.password')"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      :title="$t('user.passwordValidation')"
      @blur="checkValidity"
    />
    <button
      type="button"
      class="mt-[16px] block"
      @click="$emit('goToRestorePasswordStep')"
    >
      {{ $t('user.forgotPassword') }}
      <span class="text-brand-red cursor-pointer">{{
        $t('common.actions.restore')
      }}</span>
    </button>
    <button
      type="button"
      class="mt-[16px] block"
      @click="$emit('goToSignUpStep')"
    >
      {{ $t('user.noAccount') }}
      <span class="text-brand-red cursor-pointer">{{
        $t('common.actions.signUp')
      }}</span>
    </button>

    <p v-if="error" class="text-brand-red mt-2 mb-2">{{ error }}</p>

    <AppButton
      class="block mt-[36px] w-full text-[18px]"
      type="submit"
      :disabled="!form?.checkValidity() ?? false"
    >
      {{ $t('common.actions.signIn') }}
    </AppButton>
  </form>
</template>
<script lang="ts" setup>
import { ref, type VNodeRef } from 'vue'

import { useUserStore } from '../../store/user'
import AppButton from '../AppButton.vue'
import AppInput from '../AppInput.vue'

const emit = defineEmits(['close', 'goToRestorePasswordStep', 'goToSignUpStep'])

// Store
const userStore = useUserStore()

const { t } = useI18n()

// State
const error = ref('')

const credentials = ref({
  email: '',
  password: '',
})

const form = ref<VNodeRef | undefined>(undefined)

// Actions
const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget?.focus()
}

const clearError = () => {
  error.value = ''
}

const login = async () => {
  await userStore
    .login(credentials.value.email, credentials.value.password)
    .catch(err => {
      if (Object.keys(err).length !== 0) {
        console.error(err)
        if (err.non_field_errors) {
          error.value = t('common.wrongCredentials')
          setTimeout(clearError, 2000)
        } else {
          error.value = t('common.somethingWrong')
          setTimeout(clearError, 2000)
        }
      } else {
        credentials.value.email = ''
        credentials.value.password = ''
        emit('close')
      }
    })
}
</script>
