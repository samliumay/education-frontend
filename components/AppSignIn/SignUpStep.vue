<template>
  <form ref="form" @submit.prevent="signUp">
    <AppInput
      v-model="signUpCredentials.first_name"
      :placeholder="$t('user.first_name')"
      pattern=".{1,64}"
      :title="$t('user.firstNameRule')"
      required
      :isInvalid="validationErrors.first_name"
      @blur="checkValidity('first_name')"
    />
    <p v-if="validationErrors.first_name" class="text-brand-red">Please enter a first name.</p>

    <AppInput
      v-model="signUpCredentials.last_name"
      :placeholder="$t('user.last_name')"
      pattern=".{1,64}"
      title="$t('user.lastNameRule')"
      class="mt-[12px]"
      required
      :isInvalid="validationErrors.last_name"
      @blur="checkValidity('last_name')"
    />
    <p v-if="validationErrors.last_name" class="text-brand-red">Please enter a last name.</p>
    <AppInput
      v-model="signUpCredentials.phone_number"
      placeholder="+491112221212"
      class="mt-[12px]"
      type="tel"
      required
      :isInvalid="validationErrors.phone_number"
      @blur="checkValidity('phone_number')"
    />
    <p v-if="validationErrors.phone_number" class="text-brand-red">Please enter a vaild phone number.</p>
    <AppInput
      v-model="signUpCredentials.email"
      placeholder="E-mail"
      class="mt-[12px]"
      type="email"
      required
      :isInvalid="validationErrors.email"
      @blur="checkValidity('email')"
    />
    <p v-if="validationErrors.email" class="text-brand-red">Please enter a valid email.</p>
    <AppInput
      v-model="signUpCredentials.password1"
      :placeholder="$t('user.password')"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}"
      :title="$t('user.passwordValidation')"
      :isInvalid="validationErrors.password1"
      @blur="checkValidity('password1')"
    />
    <p v-if="validationErrors.password1" class="text-brand-red">Please enter a valid password.</p>

    <AppInput
      v-model="signUpCredentials.password2"
      :placeholder="$t('user.repeatPassword')"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}"
      :title="$t('user.passwordValidation')"
      :isInvalid="validationErrors.password2"
      @blur="checkValidity('password2')"
    />
    <p v-if="validationErrors.password2" class="text-brand-red">Please repeat a valid password.</p>

    <div class="mt-[16px]">
      {{ $t('user.hasAccount') }}
      <button
        type="button"
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
      :disabled="!isFormValid1"
    >
      {{ $t('common.actions.signUp') }}
    </AppButton>
  </form>
</template>
<script lang="ts" setup>
import { ref, type VNodeRef, computed } from 'vue'

import { useUserStore } from '../../store/user'
import AppInput from '../AppInput.vue'

// Init component
const emit = defineEmits(['close', 'goToEmailStep', 'goToVerify'])

// Store
const userStore = useUserStore()

const { t } = useI18n()

// State
const error = ref('')

const signUpCredentials = ref({
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  password1: '',
  password2: '',
})

const validationErrors = ref({
  email: false,
  password1: false,
  password2: false,
  first_name: false,
  last_name: false,
  phone_number: false,
  isFormValid: true
})

const form = ref<VNodeRef | undefined>(undefined)

// Actions
const checkValidity = (field: string) => {
   if(field === 'first_name') {
    validationErrors.value.first_name =
        signUpCredentials.value.first_name.trim().length < 1 ||
        signUpCredentials.value.first_name.trim().length > 64
  } else if(field === 'last_name') {
    validationErrors.value.last_name =
        signUpCredentials.value.last_name.trim().length < 1 ||
        signUpCredentials.value.last_name.trim().length > 64
  } else if(field === 'phone_number') {
    if (signUpCredentials.value.phone_number.startsWith('+1')) {
      // US phone number pattern
      const phoneRegex = /^\+1\s?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}(\s?x\d+)?$/
      validationErrors.value.phone_number =
        !phoneRegex.test(signUpCredentials.value.phone_number)

    } else if (signUpCredentials.value.phone_number.startsWith('+49')) {
      // German phone number pattern
      const phoneRegex = /^\+49\s?\d{2,5}[-\s]?\d{2,10}(\s?\d+)?$/
      validationErrors.value.phone_number =
        !phoneRegex.test(signUpCredentials.value.phone_number)
    } else if (signUpCredentials.value.phone_number.startsWith('+44')) {
      // UK phone number pattern
      const phoneRegex = /^\+44\s?\d{4}[-\s]?\d{6}(\s?\d+)?$/
      validationErrors.value.phone_number =
        !phoneRegex.test(signUpCredentials.value.phone_number)
    } else {
      const phoneRegex = /^\+(?:[1-9][0-9]{0,2})\s?(?:\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,4}[-\s]?\d{1,9}(\s?\d+)?$/
      validationErrors.value.phone_number =
        !phoneRegex.test(signUpCredentials.value.phone_number)
    }
  } else if (field === 'email') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    validationErrors.value.email = !emailRegex.test(signUpCredentials.value.email)
  } else if (field === 'password1') {
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,64}/
    validationErrors.value.password1 = !passwordRegex.test(signUpCredentials.value.password1)
  } else if (field === 'password2') {
    validationErrors.value.password2 = signUpCredentials.value.password1 !== signUpCredentials.value.password2
  } 
}

const clearError = () => {
  error.value = ''
}

const isFormValid1 = computed(() => {
  return !(Object.values(validationErrors.value).every(valid => valid)) 
            && Object.values(signUpCredentials.value).every(vaild_value => vaild_value.length > 0 ? true : false) 
            && signUpCredentials.value.password1 === signUpCredentials.value.password2
})

const signUp = async () => {
  await userStore
    .register(signUpCredentials.value)
    .then(() => {
      const { email } = signUpCredentials.value
      error.value = ''
      signUpCredentials.value.email = ''
      signUpCredentials.value.password1 = ''
      signUpCredentials.value.password2 = ''
      signUpCredentials.value.first_name = ''
      signUpCredentials.value.last_name = ''
      signUpCredentials.value.phone_number = ''
      emit('goToVerify', email)
    })
    .catch(err => {
      if (Object.keys(err).length !== 0) {
        if (err?.phone_number?.[0].includes('Enter a valid phone number.')) {
          error.value = t('common.errors.phone')
        } else if (err?.email?.[0].includes('Enter a valid email address.')) {
          error.value = t('common.errors.email')
        } else if (err?.email?.[0] && err?.username?.[0]) {
          error.value = t('common.errors.exists')
        } else if (
          err?.non_field_errors?.[0].includes(
            "The two password fields didn't match.",
          )
        ) {
          error.value = t('common.errors.passwordMatch')
        } else if (
          err?.phone_number?.[0].includes('This field must be unique.')
        ) {
          error.value = t('common.errors.uniquePhone')
        } else {
          error.value = t('common.somethingWrong')
        }
        setTimeout(clearError, 2000)
      }
    })
}
</script>
