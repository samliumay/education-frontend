<template>
  <n-form
    ref="formRef"
    :rules="rules"
  >
    <n-form-item
      required
      path="email"
      :label="$t('common.email')"
    >
      <n-input v-model:value="login" />
    </n-form-item>
    <n-form-item
      required
      path="password"
      :label="$t('common.password')"
    >
      <n-input
        v-model:value="password"
        type="password"
        is-password
      />
    </n-form-item>
    <n-button
      keyboard
      @click="validate"
    >
      {{ $t('common.submit') }}
    </n-button>
  </n-form>
</template>
<script setup lang="ts">
import {
  FormInst,
  FormRules,
  FormValidationError,
  NButton,
  NForm,
  NFormItem,
  NInput,
} from 'naive-ui'
import { ref } from 'vue'

import { emailRegex } from '@/constants/regexes'

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'send', login: string, password: string): void
}

const login = ref('')
const password = ref('')

const rules: FormRules = {
  email: {
    required: true,
    validator: () => emailRegex.test(login.value),
    message: 'Invalid email',
    trigger: ['input', 'blur'],
  },
}

const formRef = ref<FormInst | undefined>()

const validate = async () => {
  let isValid = true
  await formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (errors !== undefined) {
        isValid = false
      }
    },
  )
  if (!isValid) {
    return
  }
  emit('send', login.value, password.value)
}
</script>
