<template>
  <n-form ref="formRef" :rules="rules">
    <n-alert v-if="errors.non_field_errors" class="my-2" type="error">
      {{ errors.non_field_errors.join(', ') }}
    </n-alert>
    <n-form-item required path="email" label="E-mail">
      <n-input v-model:value="login" />
    </n-form-item>
    <n-form-item required path="password" :label="$t('user.password')">
      <n-input v-model:value="password" type="password" is-password />
    </n-form-item>
  </n-form>
</template>
<script setup lang="ts">
import {
  type FormInst,
  type FormRules,
  type FormValidationError,
  NAlert,
  NForm,
  NFormItem,
  NInput,
} from 'naive-ui'
import { computed, ref } from 'vue'

import { emailRegex } from '../constants/regexes'
import { useUserStore } from '../store/user'
import type { LoginErrors } from '../types'

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'submited'): void
}

const { t } = useI18n()

const login = ref('')
const password = ref('')

const errors = ref<LoginErrors>({})

const rules = computed<FormRules>(() =>
  Object.keys(errors.value).length
    ? ({
        email: {
          required: true,
          validator: () => !errors.value.email?.length,
          message: () => errors.value.email?.join(', '),
        },
        password: {
          required: true,
          validator: () => !errors.value.password?.length,
          message: () => errors.value.password?.join(', '),
        },
      } as FormRules)
    : ({
        email: {
          required: true,
          validator: () => emailRegex.test(login.value),
          message: t('user.invalidEmail'),
          trigger: ['input', 'blur'],
        },
      } as FormRules),
)

const formRef = ref<FormInst | undefined>()

const userStore = useUserStore()

const validate = async () => {
  let isValid = true
  await formRef.value?.validate(
    (validationErrors: Array<FormValidationError> | undefined) => {
      if (validationErrors !== undefined) {
        isValid = false
      }
    },
  )
  return isValid
}

const submit = async () => {
  errors.value = {}
  const isValid = await validate()
  if (!isValid) return
  await userStore.login(login.value, password.value).catch(backendErrors => {
    errors.value = backendErrors
    setTimeout(validate)
  })
  if (!Object.keys(errors.value).length) {
    emit('submited')
  }
}

defineExpose({
  submit,
})
</script>
