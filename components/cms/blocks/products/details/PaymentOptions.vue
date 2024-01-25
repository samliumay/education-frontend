<template>
  <div class="bg-brand-light-gray py-16 px-10">
    <h2 class="text-5xl uppercase font-medium mb-12">Тарифы</h2>

    <div class="grid gap-[24px]" :class="`grid-cols-${blockData?.length}`">
      <div
        v-for="item in blockData"
        :key="item.id"
        class="bg-white p-[36px] rounded-xl border-brand-dark-gray border-[1px]"
      >
        <div class="flex items-center">
          <ImageBlock :image="item?.icon_img" class="w-[64px] h-[64px]" />
          <h3 class="text-[20px] sm:text-[28px] font-medium ml-[20px]">
            {{ item.schedule_type }}
          </h3>
        </div>

        <ul class="mt-[32px] mb-[48px] pl-6">
          <li
            v-for="(option, idx) in item.options"
            :key="option"
            class="text-brand-gray pl-2"
            :class="{ 'mb-[12px]': idx + 1 !== item.options?.length }"
          >
            <p class="transform -translate-y-[3px]">{{ option }}</p>
          </li>
        </ul>

        <p class="text-[20px] font-medium mb-10">{{ item.base_price }} €</p>

        <Button class="w-full ">Забронировать</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import Button from '../../../../AppButton.vue'
import ImageBlock from '../../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
<style scoped>
li {
  list-style-image: url('/icons/plus_red.svg');
}
</style>
