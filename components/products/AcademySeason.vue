<template>
  <div class="grid grid-cols-4 gap-[24px] mx-[48px]">
    <div
      v-for="season in seasons"
      :key="season"
      class="relative h-[140px] rounded-[12px] bg-white p-[16px] cursor-pointer my-[48px]"
      :class="{ 'border-black border-[1px]': selected === season }"
      @click="$emit('update:selected', season)"
    >
      <h2 class="text-[24px] font-medium mr-[40px]">
        {{ seasonMap[season as keyof typeof seasonMap] }}
      </h2>
      <img
        v-if="season === 'summer'"
        src="../../assets/icons/products/academy_summer.svg"
        alt="Season logo"
        class="absolute bottom-[16px] right-[16px]"
      />
      <img
        v-if="season === 'autumn'"
        src="../../assets/icons/products/academy_autumn.svg"
        alt="Season logo"
        class="absolute bottom-[16px] right-[16px]"
      />
      <img
        v-if="season === 'winter'"
        src="../../assets/icons/products/academy_winter.svg"
        alt="Season logo"
        class="absolute bottom-[16px] right-[16px]"
      />
      <img
        v-if="season === 'spring'"
        src="../../assets/icons/products/academy_spring.svg"
        alt="Season logo"
        class="absolute bottom-[16px] right-[16px]"
      />
      <p
        class="text-[16px] flex items-center gap-[8px] absolute bottom-[16px] left-[16px]"
      >
        12.04
        <ArrowRight />
        16.04
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import ArrowRight from "../../assets/icons/arrow_right.svg"

defineProps<{
  selected: "summer" | "autumn" | "winter" | "spring";
}>()

defineEmits(["update:selected"])

const seasons = ["summer", "autumn", "winter", "spring"]
const seasonMap = {
  summer: "Летние каникулы 2023",
  autumn: "Осенние каникулы 2023",
  winter: "Зимние каникулы 2024",
  spring: "Пасхальные каникулы 2024",
}
</script>
