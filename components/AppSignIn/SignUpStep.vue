<template>
  <form ref="form" @submit.prevent="signUp">
    <AppInput
      v-model="signUpCredentials.first_name"
      :placeholder="$t('user.first_name')"
      pattern=".{1,64}"
      :title="$t('user.firstNameRule')"
      required
      :isInvalid="validationErrors.first_name === true"
      @blur="checkValidity('first_name')"
    />
    <p v-if="validationErrors.first_name === true" class="text-brand-red">Please enter a first name.</p>

    <!-- Last Name Input -->
    <AppInput
      v-model="signUpCredentials.last_name"
      :placeholder="$t('user.last_name')"
      pattern=".{1,64}"
      title="$t('user.lastNameRule')"
      class="mt-[12px]"
      required
      :isInvalid="validationErrors.last_name === true"
      @blur="checkValidity('last_name')"
    />
    <p v-if="validationErrors.last_name === true" class="text-brand-red">Please enter a last name.</p>

    <!-- Phone Number Input -->
    <AppInput
      v-model="signUpCredentials.phone_number"
      placeholder="+491112221212"
      class="mt-[12px]"
      type="tel"
      required
      :isInvalid="validationErrors.phone_number === true"
      @blur="checkValidity('phone_number')"
    />
    <p v-if="validationErrors.phone_number === true" class="text-brand-red">Please enter a valid phone number.</p>

    <!-- Email Input -->
    <AppInput
      v-model="signUpCredentials.email"
      placeholder="E-mail"
      class="mt-[12px]"
      type="email"
      required
      :isInvalid="validationErrors.email === true"
      @blur="checkValidity('email')"
    />
    <p v-if="validationErrors.email === true" class="text-brand-red">Please enter a valid email.</p>

    <!-- Password1 Input -->
    <AppInput
      v-model="signUpCredentials.password1"
      :placeholder="$t('user.password')"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}"
      :title="$t('user.passwordValidation')"
      :isInvalid="validationErrors.password1 === true"
      @blur="checkValidity('password1')"
      @focus="showPasswordRules = true"
      @mouseleave="showPasswordRules = false"
    />
    <p v-if="validationErrors.password1 === true && signUpCredentials.password1.length === 0" class="text-brand-red">Please enter a valid password.</p>

    <!-- Password Rules -->
    <ul v-if="validationErrors.password1 === true && signUpCredentials.password1.length > 0" class="text-gray-500 mt-2">
      <li v-if="validationPassword.lengthValid" :class="{'text-brand-red': validationPassword.lengthValid}">Minimum 8 characters</li>
      <li v-if="validationPassword.capitalLetterValid" :class="{'text-brand-red': validationPassword.capitalLetterValid}">1 capital letter</li>
      <li v-if="validationPassword.lowercaseLetterValid" :class="{'text-brand-red': validationPassword.lowercaseLetterValid}">1 lowercase letter</li>
      <li v-if="validationPassword.digitValid" :class="{'text-brand-red': validationPassword.digitValid}">1 digit</li>
    </ul>

    <!-- Password2 Input -->
    <AppInput
      v-model="signUpCredentials.password2"
      :placeholder="$t('user.repeatPassword')"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}"
      :title="$t('user.passwordValidation')"
      :isInvalid="validationErrors.password2 === true && signUpCredentials.password2.length > 0"
      @blur="checkValidity('password2')"
    />
    <p v-if="validationErrors.password2 === true" class="text-brand-red">Please repeat a valid password.</p>

    <!-- Sign In Link -->
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

    <!-- Error Message -->
    <p v-if="error" class="text-brand-red mt-2 mb-2">{{ error }}</p>

    <!-- Sign Up Button -->
    <AppButton
      class="block mt-[36px] w-full"
      type="submit"
      :disabled="!validationForm.isFormValid"
    >
      {{ $t('common.actions.signUp') }}
    </AppButton>
  </form>
</template>
<script lang="ts" setup>
import { ref, type VNodeRef, computed, watch ,onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import AppInput from '../AppInput.vue'

// Init component
const emit = defineEmits(['close', 'goToEmailStep', 'goToVerify'])

// Store
const userStore = useUserStore()

const { t } = useI18n()

// State
const error = ref('')

// const showPasswordRules = ref(false)

const signUpCredentials = ref({
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  password1: '',
  password2: '',
})

const validationErrors = ref({
  email: undefined as undefined | boolean,
  password1: undefined as undefined | boolean,
  password2: undefined as undefined | boolean,
  first_name: undefined as undefined | boolean,
  last_name: undefined as undefined | boolean,
  phone_number: undefined as undefined | boolean,
})

const validationForm = ref({
  isFormValid: false
})

const showPasswordRules = ref(false)

const validationPassword = ref({
  lengthValid: false,
  capitalLetterValid: false,
  lowercaseLetterValid: false,
  digitValid: false,
  specialCharacterValid: false,
})

// Watchers to save data to localStorage
watch(signUpCredentials, (newVal) => {
  localStorage.setItem('signUpCredentials', JSON.stringify(newVal))
}, { deep: true })

// Retrieve data on component mount
onMounted(() => {
  const savedData = localStorage.getItem('signUpCredentials')
  if (savedData) {
    signUpCredentials.value = JSON.parse(savedData)
  }
})

const form = ref<VNodeRef | undefined>(undefined)

// Actions
const checkValidity = (field: string) => {
   if(field === 'first_name') {
    const flag = signUpCredentials.value.first_name.trim().length < 1 ||
        signUpCredentials.value.first_name.trim().length > 64
    if(flag){
      validationErrors.value.first_name = true
    }else{
      validationErrors.value.first_name = false
    }
  } else if(field === 'last_name') {
    const flag =
        signUpCredentials.value.last_name.trim().length < 1 ||
        signUpCredentials.value.last_name.trim().length > 64

    if(flag){
      validationErrors.value.last_name = true
    }else{
      validationErrors.value.last_name = false
    }
  } else if(field === 'phone_number') {
    if (signUpCredentials.value.phone_number.startsWith('+1')) {
      // US phone number pattern
      const phoneRegex = /^\+1\s?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}(\s?x\d+)?$/
      const flag =
        !phoneRegex.test(signUpCredentials.value.phone_number)

      if(flag){
        validationErrors.value.phone_number = true
      }else{
        validationErrors.value.phone_number = false
      }

    } else if (signUpCredentials.value.phone_number.startsWith('+49')) {
      // German phone number pattern
      const phoneRegex = /^\+49\s?\d{2,5}[-\s]?\d{2,10}(\s?\d+)?$/
      const flag =
        !phoneRegex.test(signUpCredentials.value.phone_number)
      if(flag){
        validationErrors.value.phone_number = true
      }else{
        validationErrors.value.phone_number = false
      }
    } else if (signUpCredentials.value.phone_number.startsWith('+44')) {
      // UK phone number pattern
      const phoneRegex = /^\+44\s?\d{4}[-\s]?\d{6}(\s?\d+)?$/
      const flag =
        !phoneRegex.test(signUpCredentials.value.phone_number)

      if(flag){
        validationErrors.value.phone_number = true
      }else{
        validationErrors.value.phone_number = false
      }
    } else {
      const phoneRegex = /^\+(?:[1-9][0-9]{0,2})\s?(?:\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,4}[-\s]?\d{1,9}(\s?\d+)?$/
      const flag =
        !phoneRegex.test(signUpCredentials.value.phone_number)
      if(flag){
        validationErrors.value.phone_number = true
      }else{
        validationErrors.value.phone_number = false
      }
    }
  } else if (field === 'email') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const flag = !emailRegex.test(signUpCredentials.value.email)

    if(flag){
      validationErrors.value.email = true
    }else{
      validationErrors.value.email = false
    }
  } else if (field === 'password1') {
    // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,64}/

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}/
    const lengthRegex = /^.{8,64}$/;

    // At least 1 capital letter
    const capitalLetterRegex = /[A-Z]/;

    // At least 1 lowercase letter
    const lowercaseLetterRegex = /[a-z]/;

    // At least 1 digit
    const digitRegex = /\d/;

    // At least 1 special character
    const specialCharacterRegex = /[\W_]/;

    validationPassword.value.lengthValid = !lengthRegex.test(signUpCredentials.value.password1);
    validationPassword.value.capitalLetterValid = !capitalLetterRegex.test(signUpCredentials.value.password1);
    validationPassword.value.lowercaseLetterValid = !lowercaseLetterRegex.test(signUpCredentials.value.password1);
    validationPassword.value.digitValid = !digitRegex.test(signUpCredentials.value.password1);
    validationPassword.value.specialCharacterValid = !specialCharacterRegex.test(signUpCredentials.value.password1);

    const flag = !passwordRegex.test(signUpCredentials.value.password1)

    if(flag){
      validationErrors.value.password1 = true
    }else{
      validationErrors.value.password1 = false
    }

  } else if (field === 'password2') {

    const flag = signUpCredentials.value.password1 !== signUpCredentials.value.password2

    if(flag){
      validationErrors.value.password2 = true
    }else{
      validationErrors.value.password2 = false

    }
  }

  if(validationErrors.value.email === false && validationErrors.value.first_name === false &&
        validationErrors.value.last_name === false && validationErrors.value.phone_number === false && validationErrors.value.password1 === false
        && validationErrors.value.password2 === false
  )
  {
    validationForm.value.isFormValid = true
  }else{
    validationForm.value.isFormValid = false
  }
  validationForm.value.isFormValid = !Object.values(validationErrors.value).some(val => val === true)

}

watch(() => signUpCredentials.value.password1,  () => {
  checkValidity('password1');
});

watch(() => signUpCredentials.value.password2,  () => {
  checkValidity('password2');
});

const clearError = () => {
  error.value = ''
}

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
      localStorage.removeItem('signUpCredentials')
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
