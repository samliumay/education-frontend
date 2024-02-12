<template>
  <NuxtErrorBoundary @error="logSomeError">
    <slot />

    <template #error="{ error }">
      <div class="bg-red-200 rounded-lg block-padding flex flex-col gap-2">
        <h3 class="text-2xl">{{ $t('common.somethingWrong') }}</h3>
        <p>{{ `${$t('common.error')} ${error}` }}</p>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>
<script setup lang="ts">
const logSomeError = (error: unknown) => {
  console.error(`An error occurred in the block: ${error}`)
}
</script>
