<template>
  <div class="mx-[48px] py-[96px]">
    <h2 class="text-[48px] font-medium">Тарифы</h2>

    <div
      class="grid gap-[24px] mt-[48px]"
      :class="`grid-cols-[${items.length}]`"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white p-[36px] rounded-[12px]"
      >
        <div class="flex items-center">
          <img
            :src="item.icon_img.meta.download_url"
            :alt="item.icon_img.title"
          />
          <h3 class="text-[28px] font-medium ml-[20px]">
            {{ item.title }}
          </h3>
        </div>

        <ul class="mt-[32px] mb-[48px]">
          <li
            v-for="(option, idx) in item.options"
            :key="option"
            class="text-gray-400"
            :class="{ 'mb-[12px]': idx + 1 !== item.options?.length }"
          >
            {{ option }}
          </li>
        </ul>

        <p class="text-[20px] font-medium">
          {{ item.price }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../types'

defineProps<{
  items: PageBlock[]
}>()
</script>
<style scoped>
li {
  list-style-image: url('../../../assets/icons/plus_red.svg');
}
</style>
