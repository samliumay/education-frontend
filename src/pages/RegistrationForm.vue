<template>
  <n-form
    ref="regForm"
    :rules="rules"
  >
    <n-h1>{{ $t('common.registration') }}</n-h1>
    <n-form-item
      path="email"
      required
      :label="$t('common.email')"
    >
      <n-input v-model:value="login" />
    </n-form-item>
    <n-form-item
      path="phone"
      required
      :label="$t('common.phone')"
    >
      <n-input v-model:value="phone" />
    </n-form-item>
    <n-form-item
      path="password1"
      required
      :label="$t('common.password')"
    >
      <n-input
        v-model:value="password1"
        type="password"
        show-password-on="mousedown"
        is-password
      />
    </n-form-item>
    <n-form-item
      path="password2"
      required
      :label="$t('common.passwordRepeat')"
    >
      <n-input
        v-model:value="password2"
        type="password"
        show-password-on="mousedown"
        is-password
      />
    </n-form-item>
    <n-button @click="submit">{{ $t('common.ok') }}</n-button>
  </n-form>
</template>
<script setup lang="ts">
import {
  FormInst,
  FormItemRule,
  FormRules,
  FormValidationError,
  NButton,
  NForm,
  NFormItem,
  NH1,
  NInput,
} from 'naive-ui'
import { ref } from 'vue'

import { HTTP, setToken } from '@/api'
import { FullUser } from '@/types'

const login = ref('')
const password1 = ref('')
const password2 = ref('')
const phone = ref('+')

const emailRegex = /^\S+@\S+\.\S+$/
const phoneNumberRegex = /^\+?1?\d{9,15}$/

const rules: FormRules = {
  email: {
    required: true,
    validator: (_: FormItemRule, value: string) => emailRegex.test(value),
    message: 'Invalid email',
    trigger: ['input', 'blur'],
  },
  password1: {
    required: true,
    message: 'Required field',
    trigger: ['input', 'blur'],
  },
  password2: {
    required: true,
    validator: (_: FormItemRule, value: string) => value === password1.value,
    message: 'Passwords should be equal',
    trigger: ['input', 'blur'],
  },
  phone: {
    validator: (_, value: string) => phoneNumberRegex.test(value),
    message: 'Invalid phone number format',
    trigger: ['input', 'blur'],
  },
}

const regForm = ref<FormInst | undefined>()

const submit = async () => {
  let isValid = true
  regForm.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (errors) {
      isValid = false
    }
  })
  if (!isValid) {
    return
  }

  const newUser = await HTTP.post<FullUser>('/api/v1/users/registration/', {
    email: login.value,
    password1: password1.value,
    password2: password2.value,
    phone_number: phone.value,
  })

  setToken(newUser.token)
}
</script>
