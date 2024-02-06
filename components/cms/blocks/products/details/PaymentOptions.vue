<template>
  <div
  class="relative"
    :class="
      (isWhiteBackground ? 'bg-white' : 'bg-brand-light-gray') +
      (!withoutTitle ? ' py-16 px-10' : '')
    "
    data-cms="products-details-payment-options"
  >
    <div v-if="!isWhiteBackground" class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray" />
    <h2 v-if="!withoutTitle" class="relative text-5xl uppercase font-medium mb-12">
      Тарифы
    </h2>

    <div
      class="grid gap-[24px]"
      :class="`grid-cols-1 lg:grid-cols-${Math.max(
        blockData?.length,
        cols || 3,
      )}`"
    >
      <div
        v-for="item in blockData"
        :key="item.id"
        class="bg-white p-[30px] rounded-xl border-[1px] flex flex-col justify-between"
        :class="
          selectOption === item.id ? 'border-black' : 'border-brand-dark-gray'
        "
        @click="$emit('select', item.id)"
      >
        <div>
          <div class="flex items-center">
            <ImageBlock :image="item?.icon" class="w-[64px] h-[64px]" />
            <h3 class="text-[20px] sm:text-[26px] font-medium ml-[20px]">
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

          <p
            class="text-[20px] font-medium"
            :class="{ 'mb-10': !withoutTitle }"
          >
            {{ item.base_price }} €
          </p>
        </div>

        <!-- <Button v-if="!withoutTitle" class="w-full">Забронировать</Button> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import ImageBlock from '../../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock[]
  selectOption?: number
  isWhiteBackground?: boolean
  withoutTitle?: boolean
  cols?: number
}>()

defineEmits(['select'])
</script>
<style scoped>
li {
  list-style-image: url('/icons/plus_red.svg');
}
</style>
