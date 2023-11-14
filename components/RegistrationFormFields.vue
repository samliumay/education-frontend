<template>
  <n-alert
    v-if="errors.non_field_errors"
    class="my-2"
    type="error"
  >
    {{ errors.non_field_errors.join(', ') }}
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
      :label="$t('common.phone')"
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

    <n-form-item
      required
      path="first_name"
      :label="$t('common.first_name')"
    >
      <n-input v-model:value="firstName" />
    </n-form-item>
    <n-form-item
      required
      path="last_name"
      :label="$t('common.last_name')"
    >
      <n-input v-model:value="lastName" />
    </n-form-item>
  </n-form>
</template>
<script setup lang="ts">
import {
  type FormInst,
  type FormValidationError,
  NAlert,
  NForm,
  NFormItem,
  NInput,
} from 'naive-ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { MIN_PWD_LENGTH } from '../constants/index'
import { emailRegex, phoneNumberRegex } from '../constants/regexes'
import { useUserStore } from '../store/user'
import type { RegistrationErrors } from '../types'

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'submited'): void
}

const login = ref('')
const password1 = ref('')
const password2 = ref('')
const phoneNumber = ref('+')
const firstName = ref('')
const lastName = ref('')

const { t } = useI18n()

const errors = ref<RegistrationErrors>({})

const fields: Array<keyof RegistrationErrors> = [
  'email',
  'phone_number',
  'password1',
  'password2',
  'first_name',
  'last_name',
]

const rules = computed(() =>
  Object.keys(errors.value).length
    ? fields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: {
            validator: () => !errors.value[field],
            message: () => errors.value[field]?.join(', '),
            required: true,
          },
        }),
        {},
      )
    : {
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
        first_name: {
          validator: () => !!firstName.value,
          message: t('validation.required'),
          trigger: ['input', 'blur'],
        },
        last_name: {
          validator: () => !!lastName.value,
          message: t('validation.required'),
          trigger: ['input', 'blur'],
        },
      },
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
  await userStore
    .register(
      login.value,
      phoneNumber.value,
      password1.value,
      password2.value,
      firstName.value,
      lastName.value,
    )
    .catch(backendErrors => {
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
