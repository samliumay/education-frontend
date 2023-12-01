<template>
  <div>
    <div class="flex items-center justify-between mt-[96px] mx-[48px]">
      <div class="flex items-center gap-[16px]">
        <h1 class="text-[48px] font-medium">Курсы</h1>
        <img src="../assets/icons/products/course_stars.svg" alt="Stars" />
      </div>

      <div class="flex items-center gap-[12px] w-[800px]">
        <n-select placeholder="Направление" disabled />
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
        <n-select placeholder="Филиал" disabled />
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
  </div>
</template>
<script setup lang="ts">
import { NSelect } from "naive-ui"
import { ref } from "vue"

import ProductCard from "../components/products/ProductCard.vue"
import { getTagsFromProduct } from "../helpers/products"
import { ageOptions, languageOptions } from "../mappers/options"

const page = ref({} as any)

useHead({
  title: page.value.title || "Clavis - Courses",
  meta: [
    {
      name: "description",
      content:
        page.value.description ||
        "That's a page that contains information about all courses available at Clavis",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: page.value.canonical || "https://clavis-schule.de/",
    },
  ],
})

const filters = ref({
  language: undefined,
  age: undefined,
})

const { data: courses } = await useAsyncData(
  "courses",
  () =>
    $fetch(
      `https://api.clavis.the-o.co/api/v1/products/?${new URLSearchParams({
        type: "Course",
        ...Object.keys(filters.value).reduce((acc, filterKey) => {
          if (filters.value[filterKey as keyof typeof filters.value]) {
            acc[filterKey as keyof typeof filters.value] =
              filters.value[filterKey as keyof typeof filters.value]
          }
          return acc
        }, {} as any),
      } as any)}`,
    ),
  { watch: [filters] },
)
</script>
