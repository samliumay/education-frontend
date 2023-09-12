<template>
  <n-form
    ref="offerForm"
    :rules="rules"
  >
    <n-h2>User part</n-h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <n-form-item
        path="email"
        label="email"
        required
      >
        <n-input v-model:value="currentValue.email" />
      </n-form-item>
      <n-form-item
        path="phone_number"
        label="Phone number"
        required
      >
        <n-input v-model:value="currentValue.phone_number" />
      </n-form-item>

      <n-form-item
        path="first_name"
        label="First Name"
        required
      >
        <n-input v-model:value="currentValue.first_name" />
      </n-form-item>

      <n-form-item
        path="last_name"
        label="Last Name"
        required
      >
        <n-input v-model:value="currentValue.last_name" />
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

    <n-h2>Payment stratagy</n-h2>
    <div>
      <div>First stratagy</div>
      <div>Second stratagy</div>
    </div>
    <n-button @click="submit">Submit</n-button>
  </n-form>
</template>
<script setup lang="ts">
import {
  FormRules,
  NButton,
  NForm,
  NFormItem,
  NH2,
  NInput,
  NSelect,
} from 'naive-ui'
import { ref } from 'vue'

import { useListsStore } from '@/store/lists'
import { useUserStore } from '@/store/user'

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'send', slots: number[]): void
}

const listsStorage = useListsStore()
const userStorage = useUserStore()

const currentValue = ref({ ...userStorage.user })
const { countries, cities } = listsStorage

const offerForm = ref<FormInst | undefined>()

const emailRegex = /^\S+@\S+\.\S+$/
const phoneNumberRegex = /^\+?1?\d{9,15}$/

const rules: FormRules = {
  email: {
    required: true,
    validator: (_: FormItemRule, value: string) => emailRegex.test(value),
    message: 'Invalid email',
    trigger: ['input', 'blur'],
  },
  phone: {
    validator: (_, value: string) => phoneNumberRegex.test(value),
    message: 'Invalid phone number format',
    trigger: ['input', 'blur'],
  },
}

const submit = () => {
  let isValid = true
  offerForm.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (errors) {
        isValid = false
      }
    },
  )
  if (!isValid) {
    return
  }

  emit('send', currentValue)
}
</script>
