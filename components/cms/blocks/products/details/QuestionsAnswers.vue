<template>
  <div class="mx-[48px] py-[96px]">
    <h2 class="text-[32px] sm:text-[48px] font-medium mb-[48px]">
      ОТВЕЧАЕМ
      <br />
      НА ВОПРОСЫ
    </h2>

    <AccordionPanel
      v-for="(item, idx) in items"
      :key="item.id"
      :title="item.title"
      :description="item.description"
      :class="{ 'mb-[32px]': idx + 1 !== items.length }"
    />
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import AccordionPanel from '../../misc/AccordionPanel.vue'

defineProps<{
  items: PageBlock[]
}>()
</script>
