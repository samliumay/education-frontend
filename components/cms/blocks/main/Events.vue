<template>
  <div class="mx-[28px] md:mx-[48px]">
    <h2 class="text-[32px] sm:text-[48px] mb-[48px] font-medium">Events</h2>

    <div
      v-if="items.length > 0"
      class="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[64px]"
    >
      <ProductCard
        v-for="item in items"
        :key="item.id"
        :block-data="item"
        :extra-props="{ type: 'academy' }"
      />
    </div>
    <AppNotFound v-else />
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'
import AppNotFound from '../../../AppNotFound.vue'
import ProductCard from '../products/ProductCard.vue'

defineProps<{
  items: PageBlock[]
}>()
</script>
