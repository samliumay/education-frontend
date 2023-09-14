<template>
  <div class="max-w-sm m-auto">
    <n-h1>{{ $t('common.loginForm') }}</n-h1>
    <login-form-fields @submited="router.push('/')" />
  </div>
</template>
<script setup lang="ts">
import { NH1 } from 'naive-ui'
import { useRouter } from 'vue-router'

import LoginFormFields from '@/components/LoginFormFields.vue'

const router = useRouter()
</script>
