<template>
  <div>
    <div
      class="flex justify-between items-start mt-6 mx-[28px] md:mx-[48px] flex-col xl:flex-row xl:items-center"
    >
      <n-breadcrumb class="mb-10">
        <n-breadcrumb-item сlass="text-brand-gray">Главная</n-breadcrumb-item>
        <n-breadcrumb-item сlass="text-brand-gray">Курсы</n-breadcrumb-item>
      </n-breadcrumb>

      <div class="flex items-center justify-start gap-[18px] mb-10 xl:mb-0">
        <h1 class="text-[38px] md:text-[48px] font-medium uppercase">Курсы</h1>
        <img
          src="../assets/icons/products/course_cloud.svg"
          class="w-[60px] md:w-[80px]"
          alt="cloud"
        />
      </div>

      <div class="overflow-x-scroll w-full pb-3 md:overflow-hidden xl:w-fit">
        <div class="flex items-center gap-[12px] w-[800px]">
          <AppSelect placeholder="Направление" disabled />
          <AppSelect
            v-model:value="filters.language"
            placeholder="Язык"
            clearable
            :options="languageOptions"
          />
          <AppSelect
            v-model:value="filters.age"
            placeholder="Возраст"
            clearable
            :options="ageOptions"
          />
          <AppSelect placeholder="Филиал" disabled />
        </div>
      </div>
    </div>

    <div
      class="mt-[48px] mb-[96px] gap-[24px] mx-[48px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
    >
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
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { ref } from "vue";

import AppSelect from "../components/AppSelect.vue";
import ProductCard from "../components/products/ProductCard.vue";
import { getTagsFromProduct } from "../helpers/products";
import { ageOptions, languageOptions } from "../mappers/options";

const page = ref({} as any);

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
});

const filters = ref({
  language: undefined,
  age: undefined,
});

const { data: courses } = await useAsyncData(
  "courses",
  () =>
    $fetch(
      `https://api.clavis.the-o.co/api/v1/products/?${new URLSearchParams({
        type: "Course",
        ...Object.keys(filters.value).reduce((acc, filterKey) => {
          if (filters.value[filterKey as keyof typeof filters.value]) {
            acc[filterKey as keyof typeof filters.value] =
              filters.value[filterKey as keyof typeof filters.value];
          }
          return acc;
        }, {} as any),
      } as any)}`,
    ),
  { watch: [filters] },
);
</script>
