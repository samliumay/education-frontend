<template>
  <div class="max-w-sm m-auto">
    <template v-if="isLoginForm">
      <div class="flex justify-between">
        <n-h1>{{ $t('common.loginForm') }}</n-h1>
        <n-button @click="isLoginForm = !isLoginForm">
          {{ $t('common.registrationForm') }}
        </n-button>
      </div>
      <LoginFormFields @submited="$emit('nextStage')" />
    </template>
    <template v-else>
      <div class="flex justify-between">
        <n-h1>{{ $t('common.registrationForm') }}</n-h1>
        <n-button @click="isLoginForm = !isLoginForm">
          {{ $t('common.loginForm') }}
        </n-button>
      </div>
      <RegistrationFormFields @submited="$emit('nextStage')" />
    </template>
  </div>
</template>
<script setup lang="ts">
import { NButton, NH1 } from 'naive-ui'
import { ref } from 'vue'

import LoginFormFields from '../LoginFormFields.vue'
import RegistrationFormFields from '../RegistrationFormFields.vue'

defineEmits<Emits>()

interface Emits {
  (e: 'nextStage'): void
  (e: 'error', value: boolean): void
}

const isLoginForm = ref<boolean>(true)

// const localError = ref('')
// const error = computed({
//   get() {
//     return localError.value
//   },
//   set(newValue: string) {
//     localError.value = newValue
//     emit('error', !!newValue)
//   },
// })
</script>
