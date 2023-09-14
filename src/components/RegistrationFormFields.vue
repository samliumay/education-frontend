<template>
  <n-alert
    v-if="error"
    type="error"
  >
    {{ error }}
  </n-alert>
  <n-form
    ref="formRef"
    class="grid grid-cols-1 md:grid-cols-2 gap-2"
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
      path="phone_number"
      :label="$t('common.phone_number')"
    >
      <n-input v-model:value="phoneNumber" />
    </n-form-item>
    <n-form-item
      required
      path="password1"
      :label="$t('common.password1')"
    >
      <n-input
        v-model:value="password1"
        type="password"
        is-password
      />
    </n-form-item>

    <n-form-item
      required
      path="password2"
      :label="$t('common.password2')"
    >
      <n-input
        v-model:value="password2"
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
import { useI18n } from 'vue-i18n'

import { MIN_PWD_LENGTH } from '@/constants/index'
import { emailRegex, phoneNumberRegex } from '@/constants/regexes'
import { useUserStore } from '@/store/user'

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'submited'): void
}

const login = ref('')
const password1 = ref('')
const password2 = ref('')
const phoneNumber = ref('+')

const { t } = useI18n()

const rules: FormRules = {
  email: {
    required: true,
    validator: () => emailRegex.test(login.value),
    message: t('validation.email'),
    trigger: ['input', 'blur'],
  },
  phone_number: {
    validator: () => phoneNumberRegex.test(phoneNumber.value),
    message: t('validation.phoneNumber'),
    trigger: ['input', 'blur'],
  },
  password1: {
    validator: () => password1.value.length >= MIN_PWD_LENGTH,
    message: t('validation.password1', { n: MIN_PWD_LENGTH }),
    trigger: ['input', 'blur'],
  },
  password2: {
    validator: () => password1.value === password2.value,
    message: t('validation.password2'),
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
    .register(login.value, phoneNumber.value, password1.value, password2.value)
    .then(() => emit('submited'))
}

defineExpose({
  validate,
})
</script>
