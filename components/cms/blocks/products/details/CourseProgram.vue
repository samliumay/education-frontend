<template>
  <div>
    <h2 class="text-5xl uppercase font-medium mb-12 px-10">Программа</h2>

    <template v-for="(item, idx) in items" :key="item.id">
      <AppDivider class="mb-[40px]" :class="{ 'mt-[40px]': idx !== 0 }" />
      <div class="grid grid-cols-[1fr,160px,1fr] gap-12 px-10">
        <h3 class="text-[20px] sm:text-[28px] font-medium uppercase">
          {{ item.title }}
        </h3>

        <ImageBlock
          :image="item.icon"
          class="w-[160px] translate-y-1.5"
        />

        <p class="text-gray-400">
          {{ item.text }}
        </p>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import AppDivider from '../../../../AppDivider.vue'
import ImageBlock from '../../misc/ImageBlock.vue'

defineProps<{
  items: PageBlock[]
}>()
</script>
