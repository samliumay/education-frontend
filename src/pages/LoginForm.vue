<template>
  <n-form>
    <div class="max-w-sm m-auto">
      <n-h1>{{ $t('common.loginForm') }}</n-h1>
      <n-alert v-show="error">{{ error }}</n-alert>
      <n-form-item
        required
        :label="$t('common.email')"
      >
        <n-input v-model:value="login" />
      </n-form-item>
      <n-form-item
        required
        :label="$t('common.password')"
      >
        <n-input
          v-model:value="password"
          type="password"
          is-password
        />
      </n-form-item>
      <n-button @click="submit">{{ $t('common.submit') }}</n-button>
    </div>
  </n-form>
</template>
<script setup lang="ts">
import { NAlert, NButton, NForm, NFormItem, NH1, NInput } from 'naive-ui'
import { ref } from 'vue'

import { HTTP } from '@/assets/api'
import { useUserStore } from '@/store/user'

const login = ref('')
const password = ref('')

const error = ref('')

const userStore = useUserStore()
const submit = async () => {
  const user = await HTTP.post('/api/v1/users/login/', {
    email: login,
    password,
  }).catch(errors => {
    error.value = errors
  })
  userStore.setUser(user)
}
</script>
