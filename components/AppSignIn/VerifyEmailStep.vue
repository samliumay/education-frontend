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
  </div>
</template>
<script setup lang="ts">
defineProps<{
  email: string
}>()
</script>
