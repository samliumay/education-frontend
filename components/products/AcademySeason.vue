<template>
  <div class="flex flex-col">
    <h3 class="mb-4 font-medium">{{ $t('common.actions.chooseSeason') }}</h3>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-[24px]">
      <div
        v-for="season in seasons"
        :key="season"
        class="relative min-h-[140px] rounded-[12px] bg-brand-light-gray p-[16px] cursor-pointer flex flex-col justify-between"
        :class="{ 'border-black border-[1px]': selected === season }"
        @click="$emit('update:selected', season)"
      >
        <h2 class="relative text-2xl font-medium mr-[40px] text-brand-black">
          {{ seasonMap[season as keyof typeof seasonMap].text }}
        </h2>

        <div class="relative w-full flex items-center justify-between">
          <p class="flex items-center gap-[8px]">
            {{ seasonMap[season as keyof typeof seasonMap].dateStart }}
            <ArrowRight />
            {{ seasonMap[season as keyof typeof seasonMap].dateEnd }}
          </p>
        </div>

        <img
          :src="seasonMap[season as keyof typeof seasonMap].image"
          alt="Arrow"
          class="w-[30%] h-[30%] absolute bottom-2 right-1"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ArrowRight from '../../public/icons/arrow_right.svg'
import { useI18n } from 'vue-i18n'

defineProps<{
  selected: 'Summer' | 'Autumn' | 'Winter' | 'Spring'
}>()

defineEmits(['update:selected'])

const { t } = useI18n()

const seasons = ['Summer', 'Autumn', 'Winter', 'Spring']
const seasonMap = {
  Summer: {
    text: t('common.filters.seasons.summer'),
    dateStart: '17.07',
    dateEnd: '25.08',
    image: '/icons/products/academy_summer.svg',
  },
  Autumn: {
    text: t('common.filters.seasons.autumn'),
    dateStart: '23.10',
    dateEnd: '03.11',
    image: '/icons/products/academy_autumn.svg',
  },
  Winter: {
    text: t('common.filters.seasons.winter'),
    dateStart: '05.02',
    dateEnd: '09.02',
    image: '/icons/products/academy_winter.svg',
  },
  Spring: {
    text: t('common.filters.seasons.spring'),
    dateStart: '25.03',
    dateEnd: '05.04',
    image: '/icons/products/academy_spring.svg',
  },
}
</script>
