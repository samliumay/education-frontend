<template>
  <div class="mx-[28px] md:mx-[48px] mt-6">
    <n-breadcrumb class="mb-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">Главная</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">Академии</n-breadcrumb-item>
    </n-breadcrumb>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-[18px] mb-10">
        <h1 class="text-[38px] md:text-[48px] font-medium uppercase">
          Академии
        </h1>
        <img
          src="../assets/icons/products/academy_cloud.svg"
          class="w-[60px] md:w-[80px]"
          alt="cloud"
        />
      </div>
    </div>

    <div class="w-full overflow-x-auto xl:overflow-hidden pb-3">
      <AcademySeason
        :selected="selectedSeason"
        @update:selected="(el) => (selectedSeason = el)"
      />
    </div>

    <div class="w-full overflow-x-auto lg:overflow-hidden pb-3">
      <div class="ml-auto flex items-center gap-[12px] mt-[48px] w-[800px]">
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
        <AppSelect placeholder="Смена" disabled />
      </div>
    </div>

    <div
      class="mt-[48px] mb-[96px] grid gap-[24px] grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
    >
      <ProductCard
        v-for="academy in academies"
        :key="academy.id"
        :name="academy.name"
        :times="academy.schedule_slots"
        type="academy"
        :tags="getTagsFromProduct(academy)"
        @click="navigateTo(`/academy/${academy.id}`)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { ref } from "vue";

import AppSelect from "../components/AppSelect.vue";
import AcademySeason from "../components/products/AcademySeason.vue";
import ProductCard from "../components/products/ProductCard.vue";
import { getTagsFromProduct } from "../helpers/products";
import { ageOptions, languageOptions } from "../mappers/options";

const page = ref({} as any);

useHead({
  title: page.value.title || "Clavis - Academies",
  meta: [
    {
      name: "description",
      content:
        page.value.description ||
        "That's a page that contains information about all academies available at Clavis",
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

const selectedSeason = ref("summer" as "summer");

const { data: academies } = await useAsyncData(
  "courses",
  () =>
    $fetch(
      `https://api.clavis.the-o.co/api/v1/products/?${new URLSearchParams({
        type: "Academy",
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
