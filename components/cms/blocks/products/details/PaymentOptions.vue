<template>
  <div :class="(isWhiteBackground ? 'bg-white' : 'bg-brand-light-gray') + (!withoutTitle ? ' py-16 px-10' : '')">
    <h2 v-if="!withoutTitle" class="text-5xl uppercase font-medium mb-12">Тарифы</h2>

    <div class="grid gap-[24px]" :class="`grid-cols-${Math.max(blockData?.length, cols || 3)}`">
      <div
        v-for="item in blockData"
        :key="item.id"
        class="bg-white p-[36px] rounded-xl border-[1px]"
        :class="selectOption === item.id ? 'border-black' : 'border-brand-dark-gray'"
        @click="$emit('select', item.id)"
      >
        <div class="flex items-center">
          <ImageBlock :image="item?.icon" class="w-[64px] h-[64px]" />
          <h3 class="text-[20px] sm:text-[28px] font-medium ml-[20px]">
            {{ item.title }}
          </h3>
        </div>

        <ul class="mt-[32px] mb-[48px] pl-6">
          <li
            v-for="(option, idx) in item.bullet_points"
            :key="option.id"
            class="text-brand-gray pl-2"
            :class="{ 'mb-[12px]': idx + 1 !== item.bullet_points?.length }"
          >
            <p class="transform -translate-y-[3px]">{{ option.value }}</p>
          </li>
        </ul>

        <p class="text-[20px] font-medium" :class="{ 'mb-10': !withoutTitle }">{{ item.base_price }} €</p>

        <Button v-if="!withoutTitle" class="w-full ">Забронировать</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import Button from '../../../../AppButton.vue'
import ImageBlock from '../../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock[],
  selectOption?: number,
  isWhiteBackground?: boolean,
  withoutTitle?: boolean,
  cols?: number
}>()

defineEmits(['select'])
</script>
<style scoped>
li {
  list-style-image: url('/icons/plus_red.svg');
}
</style>
