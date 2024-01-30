<template>
  <form ref="form" @submit.prevent="signUp">
    <AppInput
      v-model="signUpCredentials.first_name"
      placeholder="Имя"
      required
      pattern=".{2,}"
      title="The name must contain at least two characters"
      @blur="checkValidity"
    />
    <AppInput
      v-model="signUpCredentials.last_name"
      placeholder="Фамилия"
      pattern=".{2,}"
      title="Last name must contain at least two characters"
      class="mt-[12px]"
      required
      @blur="checkValidity"
    />
    <AppInput
      v-model="signUpCredentials.phone_number"
      maska="+49 ### ###-##-##"
      placeholder="Номер телефона"
      class="mt-[12px]"
      type="tel"
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
      placeholder="Пароль"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      @blur="checkValidity"
    />
    <AppInput
      v-model="signUpCredentials.password2"
      placeholder="Повторите пароль"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      @blur="checkValidity"
    />
    <div class="mt-[16px]">
      Уже есть аккаунт?
      <button class="text-brand-red cursor-pointer" @click="$emit('goToEmailStep')">Войти</button>
    </div>

    <p v-if="error" class="text-brand-red mt-2 mb-2">{{ error }}</p>

    <AppButton
      class="block mt-[36px] w-full"
      type="submit"
      :disabled="!form?.checkValidity() ?? false"
    >
      Зарегистрироваться
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
const checkValidity = (event: { target: { reportValidity: () => void } }) => {
  event.target.reportValidity()
}

const clearError = () => {
  error.value = ''
}

const signUp = async () => {
  await userStore.register(signUpCredentials.value).catch(err => {
    if (Object.keys(err).length !== 0) {
      error.value = 'Кажется, что-то пошло не так'
      setTimeout(clearError, 2000)
    } else {
      error.value = ''
      signUpCredentials.value.email = ''
      signUpCredentials.value.password1 = ''
      signUpCredentials.value.password2 = ''
      signUpCredentials.value.first_name = ''
      signUpCredentials.value.last_name = ''
      signUpCredentials.value.phone_number = ''
      emit('close')
    }
  })
}
</script>
