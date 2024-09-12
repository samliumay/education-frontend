<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <h2 class="text-4xl font-medium text-center">
      {{ $t('user.verifyEmail') }}
    </h2>
    <img src="/icons/sms-star.svg" alt="Star" />
    <p class="text-brand-gray text-lg text-center">
      {{ $t('user.verify1') + email + $t('user.verify2') }}
      <br />
      {{ $t('user.verify3') }}
    </p>
    <div class="flex flex-col items-center justify-center gap-6">
    <p>If you haven't received the verification email, click the button below to resend it.</p>
    
    <!-- Show a success message if email is resent -->
    <p v-if="emailResent">Verification email resent successfully.</p>

    <!-- Button to trigger resend email -->
    <AppButton class="place-self-center ..." @click="resendVerificationEmail" :disabled="isLoading">
      {{ $t('user.resendVerifyEmail') }}
    </AppButton>
  </div>
  </div>
</template>
<script setup lang="ts">

import { useUserStore } from '../../store/user'
import { ref, computed, watch  } from 'vue'

const props = defineProps<{
  email: string
}>()

const isLoading = ref(false)
const emailResent = ref(false)

const userStore = useUserStore()


const resendVerificationEmail = async () => {
  isLoading.value = true
  await userStore
    .resendVerificationEmail(props.email)
    .then(() => {
      
      emailResent.value = true
      isLoading.value = false
    })
    .catch(err => {
      console.error('Error resending verification email:', err);
    })
}
</script>
