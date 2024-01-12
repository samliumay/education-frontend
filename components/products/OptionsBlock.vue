<template>
  <div class="bg-white py-[96px] px-[84px]">
    <h2 class="text-[48px] font-medium">Опции</h2>
    <div class="w-[900px] mx-auto">
      <SubscriptionOptions :product="product" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '../../types'
import SubscriptionOptions from './SubscriptionOptions.vue'

defineProps<{
  product: Product
}>()
</script>
