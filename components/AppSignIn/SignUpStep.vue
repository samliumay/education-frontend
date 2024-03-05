<template>
  <form ref="form" @submit.prevent="signUp">
    <AppInput
      v-model="signUpCredentials.first_name"
      :placeholder="$t('user.first_name')"
      required
      pattern=".{2,}"
      :title="$t('user.nameRule')"
      @blur="checkValidity"
    />
    <AppInput
      v-model="signUpCredentials.last_name"
      :placeholder="$t('user.last_name')"
      pattern=".{2,}"
      title="$t('user.lastNameRule')"
      class="mt-[12px]"
      required
      @blur="checkValidity"
    />
    <AppInput
      v-model="signUpCredentials.phone_number"
      maska="+49 ### ###-##-##"
      :placeholder="$t('user.phone_number')"
      class="mt-[12px]"
      type="tel"
      pattern=".{13,20}"
      required
      @blur="checkValidity"
    />
    <AppInput
      v-model="signUpCredentials.email"
      placeholder="E-mail"
      class="mt-[12px]"
      type="email"
      required
      @blur="checkValidity"
    />
    <AppInput
      v-model="signUpCredentials.password1"
      :placeholder="$t('user.password')"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      :title="$t('user.passwordValidation')"
      @blur="checkValidity"
    />
    <AppInput
      v-model="signUpCredentials.password2"
      :placeholder="$t('user.repeatPassword')"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      :title="$t('user.passwordValidation')"
      @blur="checkValidity"
    />
    <div class="mt-[16px]">
      {{ $t('user.hasAccount') }}
      <button
        class="text-brand-red cursor-pointer"
        @click="$emit('goToEmailStep')"
      >
        {{ $t('common.actions.signIn') }}
      </button>
    </div>

    <p v-if="error" class="text-brand-red mt-2 mb-2">{{ error }}</p>

    <AppButton
      class="block mt-[36px] w-full"
      type="submit"
      :disabled="!form?.checkValidity() ?? false"
    >
      {{ $t('common.actions.signUp') }}
    </AppButton>
  </form>
</template>
<script lang="ts" setup>
import { ref, type VNodeRef } from 'vue'

import { useUserStore } from '../../store/user'
import AppInput from '../AppInput.vue'

// Init component
const emit = defineEmits(['close', 'goToEmailStep'])

// Store
const userStore = useUserStore()

const { t } = useI18n()

// State
const error = ref('')

const signUpCredentials = ref({
  email: '',
  password1: '',
  password2: '',
  first_name: '',
  last_name: '',
  phone_number: '',
})

const form = ref<VNodeRef | undefined>(undefined)

// Actions
const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget.focus()
}

const clearError = () => {
  error.value = ''
}

const signUp = async () => {
  await userStore.register(signUpCredentials.value).catch(err => {
    if (Object.keys(err).length !== 0) {
      error.value = t('common.somethingWrong')
      setTimeout(clearError, 2000)
    } else {
      const { email } = signUpCredentials.value
      error.value = ''
      signUpCredentials.value.email = ''
      signUpCredentials.value.password1 = ''
      signUpCredentials.value.password2 = ''
      signUpCredentials.value.first_name = ''
      signUpCredentials.value.last_name = ''
      signUpCredentials.value.phone_number = ''
      emit('goToEmailStep', email)
    }
  })
}
</script>
