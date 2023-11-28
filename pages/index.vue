<template>
  <div class="flex items-center justify-between mt-[96px] mx-[48px]">
    <div class="flex items-center gap-[16px]">
      <h1 class="text-[48px] font-medium">Курсы</h1>
      <img src="../assets/icons/products/course_stars.svg" alt="Stars" />
    </div>

    <div class="flex items-center gap-[12px] w-[800px]">
      <n-select
        placeholder="Направление"
        disabled
      />
      <n-select
        v-model:value="filters.language"
        placeholder="Язык"
        clearable
        :options="languageOptions"
      />
      <n-select
        v-model:value="filters.age"
        placeholder="Возраст"
        clearable
        :options="ageOptions"
      />
      <n-select
        placeholder="Филиал"
        disabled
      />
    </div>
  </div>

  <div class="mt-[48px] mb-[96px] grid grid-cols-3 gap-[24px] mx-[48px]">
    <ProductCard
      v-for="course in courses"
      :key="course.id"
      :name="course.name"
      :times="course.schedule_slots"
      type="course"
      :tags="getTagsFromProduct(course)"
      @click="navigateTo(`/course/${course.id}`)"
    />
  </div>
</template>
<script setup lang="ts">
import { NSelect } from "naive-ui"
import { ref, watch } from "vue"

import ProductCard from "../components/products/ProductCard.vue"
import { getTagsFromProduct } from "../helpers/products"
import { ageOptions, languageOptions } from '../mappers/options'

const filters = ref({
  language: undefined,
  age: undefined,
})

const { data: courses, refresh } = await useFetch(`https://api.clavis.the-o.co/api/v1/products/`, {
  query: { type: 'Course', ...filters.value },
})

watch(() => filters.value, () => {
  refresh()
}, { deep: true })
</script>
