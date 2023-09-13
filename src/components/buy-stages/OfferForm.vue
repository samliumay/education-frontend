<template>
  <n-form
    ref="offerForm"
    :rules="rules"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <n-form-item
        required
        path="email"
        :label="$t('common.email')"
      >
        <n-input v-model:value="currentValue.email" />
      </n-form-item>
      <n-form-item
        required
        path="password"
        :label="$t('common.password')"
      >
        <n-input
          v-model:value="currentValue.password"
          type="password"
          is-password
        />
      </n-form-item>
      <n-form-item
        path="phone_number"
        label="Phone number"
        required
      >
        <n-input v-model:value="currentValue.phone_number" />
      </n-form-item>
      <div />

      <n-form-item
        path="first_name"
        label="First Name"
        required
      >
        <n-input v-model:value="currentValue.child_first_name" />
      </n-form-item>

      <n-form-item
        path="last_name"
        label="Last Name"
        required
      >
        <n-input v-model:value="currentValue.child_last_name" />
      </n-form-item>

      <n-form-item
        label="Country"
        path="country"
        required
      >
        <n-select
          v-model:value="currentValue.country"
          :options="countries"
        />
      </n-form-item>

      <n-form-item
        label="City"
        path="city"
        required
      >
        <n-select
          v-model:value="currentValue.city"
          :options="cities"
        />
      </n-form-item>

      <n-form-item
        path="state"
        label="State"
        required
      >
        <n-input v-model:value="currentValue.state" />
      </n-form-item>
      <n-form-item
        path="street"
        label="Street"
        required
      >
        <n-input v-model:value="currentValue.street" />
      </n-form-item>

      <n-form-item
        path="post_code"
        label="Street"
        required
      >
        <n-input v-model:value="currentValue.post_code" />
      </n-form-item>
      <n-form-item
        path="company_name"
        label="Company name"
        required
      >
        <n-input v-model:value="currentValue.company_name" />
      </n-form-item>
    </div>

    <n-button @click="submit">Submit</n-button>
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
  NSelect,
} from 'naive-ui'
import { ref } from 'vue'

import { useListsStore } from '@/store/lists'
import { useUserStore } from '@/store/user'
import { FullUser } from '@/types'

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'send', value: FullUser): void
  (e: 'error', value: boolean): void
}

const listsStorage = useListsStore()
const userStorage = useUserStore()

const currentValue = ref<FullUser>({ ...userStorage.user })
const { countries, cities } = listsStorage

const offerForm = ref<FormInst | undefined>()

const emailRegex = /^\S+@\S+\.\S+$/
const phoneNumberRegex = /^\+?1?\d{9,15}$/

const requiredFields = [
  'child_first_name',
  'child_last_name',
  'company_name',
  'city',
  'country',
  'state',
  'street',
  'post_code',
]
const rules: FormRules = {
  email: {
    required: true,
    validator: () => emailRegex.test(currentValue.value.email),
    message: 'Invalid email',
    trigger: ['input', 'blur'],
  },
  phone_number: {
    validator: () => phoneNumberRegex.test(currentValue.value.phone_number),
    message: 'Invalid phone number format',
    trigger: ['input', 'blur'],
  },
  ...requiredFields.reduce(
    (acc: FormRules, field: string) => ({
      ...acc,
      [field]: {
        required: true,
        message: 'This field is required',
        trigger: ['input', 'blur'],
      },
    }),
    {} as FormRules,
  ),
}

const submit = () => {
  let isValid = true
  emit('error', false)
  offerForm.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (errors) {
        isValid = false
        emit('error', true)
      }
    },
  )
  if (!isValid) {
    return
  }

  emit('send', currentValue.value)
}
</script>
