<template>
  <div class="grid grid-cols-4 gap-[24px] min-w-[1100px]">
    <div
      v-for="season in seasons"
      :key="season"
      class="relative min-h-[140px] rounded-[12px] bg-brand-light-gray p-[16px] cursor-pointer flex flex-col justify-between"
      :class="{ 'border-black border-[1px]': selected === season }"
      @click="$emit('update:selected', season)"
    >
      <h2 class="text-[24px] font-medium mr-[40px] text-brand-red">
        {{ seasonMap[season as keyof typeof seasonMap] }}
      </h2>

      <div class="w-full flex items-center justify-between">
        <p class="flex items-center gap-[8px]">
          12.04
          <ArrowRight />
          16.04
        </p>

        <img
          src="/icons/chevron_left.svg"
          alt="Arrow"
          class="w-[24px] h-[24px]"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ArrowRight from '../../public/icons/arrow_right.svg'

defineProps<{
  selected: 'summer' | 'autumn' | 'winter' | 'spring'
}>()

defineEmits(['update:selected'])

const seasons = ['summer', 'autumn', 'winter', 'spring']
const seasonMap = {
  summer: 'Летние каникулы 2023',
  autumn: 'Осенние каникулы 2023',
  winter: 'Зимние каникулы 2024',
  spring: 'Пасхальные каникулы 2024',
}
</script>
