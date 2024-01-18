<template>
  <div class="flex flex-col gap-10">
    <h2 class="w-full sm:w-7/12 text-5xl font-medium">
      Unsere Kursangebote für Kinder und Jugendliche
    </h2>

    <div class="grid grid-cols-3 gap-6">
      <NuxtLink
        v-for="item in items"
        :key="item.id"
        class="bg-brand-light-gray p-6 rounded-lg cursor-pointer transition ease-in delay-100 transform active:scale-[0.98]"
        :to="item?.link ?? '/'"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-5xl text-brand-red font-medium">
            {{ item.title }}
          </h3>
          <img class="mt-1" src="/icons/chevron_left.svg" alt="Arrow" />
        </div>

        <div class="border-t-[1px] border-brand-red mt-6 mb-4" />

        <p class="text-brand-gray mb-4">
          {{ item.description }}
        </p>

        <img
          :src="item.title_img.meta.download_url"
          :alt="item.title_img.title"
          class="w-full rounded-lg aspect-square"
        />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  items: PageBlock[]
}>()
</script>
