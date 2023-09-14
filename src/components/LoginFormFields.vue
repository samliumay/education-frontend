<template>
  <n-form
    ref="formRef"
    :rules="rules"
  >
    <n-alert
      v-if="error"
      type="error"
    >
      {{ error }}
    </n-alert>
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
  </n-form>
</template>
<script setup lang="ts">
import {
  FormInst,
  FormRules,
  FormValidationError,
  NAlert,
  NForm,
  NFormItem,
  NInput,
} from 'naive-ui'
import { ref } from 'vue'

import { emailRegex } from '@/constants/regexes'
import { useUserStore } from '@/store/user'

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'submited'): void
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

const error = ref('')
const userStore = useUserStore()

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
  await userStore
    .login(login.value, password.value)
    .then(() => emit('submited'))
}

defineExpose({
  validate,
})
</script>
