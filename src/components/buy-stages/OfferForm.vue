<template>
  <n-form
    ref="offerForm"
    :rules="rules"
    :model="currentValue"
  >
    <template v-if="isLoginForm">
      <div>
        <n-h2 class="mb-1">{{ $t('common.loginForm') }}</n-h2>
        <n-a
          class="underline mb-2"
          @click="isLoginForm = !isLoginForm"
        >
          {{ $t('common.registrationForm') }}
        </n-a>
      </div>
      <LoginFormFields ref="loginForm" />
    </template>
    <template v-else>
      <div>
        <n-h2 class="mb-1">{{ $t('common.registrationForm') }}</n-h2>
        <n-a
          class="underline mb-2"
          @click="isLoginForm = !isLoginForm"
        >
          {{ $t('common.loginForm') }}
        </n-a>
      </div>
      <RegistrationFormFields ref="registrationForm" />
    </template>

    <n-h2>Payment details</n-h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <!-- <n-form-item
        path="phone_number"
        label="Phone number"
        required
      >
        <n-input v-model:value="currentValue.phone_number" />
      </n-form-item> -->

      <n-form-item
        path="child_first_name"
        label="First Name"
        required
      >
        <n-input v-model:value="currentValue.child_first_name" />
      </n-form-item>

      <n-form-item
        path="child_last_name"
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
          :options="
            countries.map(country => ({
              label: country.name,
              value: country.id,
            }))
          "
        />
      </n-form-item>

      <n-form-item
        label="City"
        path="city"
        required
      >
        <n-select
          v-model:value="currentValue.city"
          :options="
            cities.map(city => ({
              label: city.name,
              value: city.id,
            }))
          "
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

    <n-button @click="submit">{{ $t('common.submit') }}</n-button>
  </n-form>
</template>
<script setup lang="ts">
import {
  FormInst,
  FormRules,
  FormValidationError,
  NA,
  NButton,
  NForm,
  NFormItem,
  NH2,
  NInput,
  NSelect,
} from 'naive-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { phoneNumberRegex } from '@/constants/regexes'
import { useListsStore } from '@/store/lists'
import { useUserStore } from '@/store/user'
import { FullUser } from '@/types'

import LoginFormFields from '../LoginFormFields.vue'
import RegistrationFormFields from '../RegistrationFormFields.vue'

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'send', value: FullUser): void
  (e: 'error', value: boolean): void
}

const isLoginForm = ref<boolean>(true)

const listsStorage = useListsStore()
const userStorage = useUserStore()

const currentValue = ref<FullUser>({ ...userStorage.user })
const { countries, cities } = listsStorage

const offerForm = ref<FormInst | undefined>()

const { t } = useI18n()
const requiredFields: Array<keyof FullUser> = [
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
  phone_number: {
    validator: () => phoneNumberRegex.test(currentValue.value.phone_number),
    message: t('validation.phoneNumber'),
    trigger: ['input', 'blur'],
  },
  ...requiredFields.reduce(
    (acc: FormRules, field: string) => ({
      ...acc,
      [field]: {
        required: true,
        message: t('validation.required'),
      },
    }),
    {} as FormRules,
  ),
}

const registrationForm = ref<typeof RegistrationFormFields | undefined>()
const loginForm = ref<typeof LoginFormFields | undefined>()

const submitFirstForm = async () => {
  if (isLoginForm.value) await loginForm.value?.validate()
  else await registrationForm.value?.validate()
}

const submit = async () => {
  await submitFirstForm()
  let isValid = true
  emit('error', false)
  await offerForm.value?.validate(
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

  userStorage.setUser({
    ...userStorage.user,
    ...requiredFields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: currentValue.value[field],
      }),
      {} as FullUser,
    ),
  })
  emit('send', userStorage.user)
}
</script>
