<template>
  <div class="grid grid-cols-4 gap-[24px]" data-cms="catalogues-academy-seasons">
    <div
      v-for="item in items"
      :key="item.title"
      class="rounded-[12px] bg-gray-200 p-[16px] flex flex-col justify-between"
    >
      <h2>
        {{ item.title }}
      </h2>

      <p class="flex items-center gap-[8px] absolute bottom-[16px] left-[16px]">
        12.04
        <ArrowRight />
        16.04
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import ArrowRight from '../../../../public/icons/arrow_right.svg'
import { type AcademySeason } from '../../../../types'

defineProps<{
  items: AcademySeason[]
}>()
</script>
