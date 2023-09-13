<template>
  <div class="max-w-sm m-auto">
    <n-h1>{{ $t('common.loginForm') }}</n-h1>
    <n-alert v-show="error">{{ error }}</n-alert>
    <LoginFormFields @send="submit" />
  </div>
</template>
<script setup lang="ts">
import { NAlert, NH1 } from 'naive-ui'
import { computed, ref } from 'vue'

import { HTTP } from '@/api'
import { useUserStore } from '@/store/user'

import LoginFormFields from '../LoginFormFields.vue'
import { FullUser } from '@/types'

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'nextStage'): void
  (e: 'error', value: boolean): void
}

const localError = ref('')
const error = computed({
  get() {
    return localError.value
  },
  set(newValue: string) {
    localError.value = newValue
    emit('error', !!newValue)
  },
})

const userStore = useUserStore()

const submit = async (login: string, password: string) => {
  error.value = ''
  const user = await HTTP.post<FullUser>('/api/v1/users/login/', {
    email: login,
    password,
  }).catch(errors => {
    error.value = errors
  })
  if (!error.value && user) userStore.setUser(user)

  emit('nextStage')
}
</script>
