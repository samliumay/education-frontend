<template>
  <n-modal
    show
    preset="card"
    class="!w-[600px]"
    :title="$t('cookies.title')"
    @close="$emit('close', true)"
  >
    <n-p> {{ $t('cookies.body') }}</n-p>

    <n-space class="mb-2" justify="center">
      <n-button
        type="primary"
        class="text-green-500 w-full"
        @click="() => $emit('close', true)"
      >
        {{ $t('cookies.btn1') }}
      </n-button>
      <n-button @click="() => $emit('close', true)">
        {{ $t('cookies.btn2') }}
      </n-button>
      <n-button @click="() => $emit('close', true)">
        {{ $t('cookies.btn3') }}
      </n-button>
    </n-space>

    <n-a class="underline flex justify-center" href="/widerrufsbelehrung">
      {{ $t('cookies.link') }}
    </n-a>
  </n-modal>
</template>
<script setup lang="ts">
import { NA, NButton, NModal, NP, NSpace } from 'naive-ui'

defineEmits<Emits>()

interface Emits {
  (e: 'close', value: boolean): void
}
</script>
