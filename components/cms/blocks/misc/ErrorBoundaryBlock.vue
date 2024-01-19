<template>
  <NuxtErrorBoundary @error="logSomeError">
    <slot />

    <template #error="{ error }">
      <div class="bg-red-200 rounded-lg p-10 flex flex-col gap-2">
        <h3 class="text-2xl">Oops! It seems something went wrong.</h3>
        <p>Error: {{ error }}</p>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>
<script setup lang="ts">
const logSomeError = (error: unknown) => {
  console.error(`An error occurred in the block: ${error}`)
}
</script>
