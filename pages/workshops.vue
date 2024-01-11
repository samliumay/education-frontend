<template>
  <n-breadcrumb class="mt-6 mb-10 mx-[28px] md:mx-[48px]">
    <n-breadcrumb-item сlass="text-brand-gray"><NuxtLink to="/">Главная</NuxtLink></n-breadcrumb-item>
    <n-breadcrumb-item сlass="text-brand-gray">Воркшопы</n-breadcrumb-item>
  </n-breadcrumb>

  <div
    class="flex items-start mx-[28px] md:mx-[48px] flex-col justify-start md:flex-row md:justify-between"
  >
    <div class="flex items-center gap-[18px]">
      <h1 class="text-[38px] md:text-[48px] font-medium uppercase">Воркшопы</h1>
      <img
        src="../assets/icons/products/workshop_cloud.svg"
        class="w-[60px] md:w-[80px]"
        alt="cloud"
      />
    </div>

    <div class="flex items-center gap-[12px] w-[200px]">
      <AppSelect
        v-model:value="filters.age"
        placeholder="Возраст"
        clearable
        :options="ageOptions"
      />
    </div>
  </div>

  <div
      class="mt-[48px] gap-[24px] mx-[48px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
    >
      <PageConstructor v-if="!pending" :page-blocks="workshops.items" />
      <p v-else>Loading...</p>
    </div>

  <div class="mx-[28px] md:mx-[48px] flex justify-center w-full mb-10 mt-6">
      <AppButton>Показать больше</AppButton>
    </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui"
import { ref } from "vue"

import AppSelect from "../components/AppSelect.vue"
import { ageOptions } from "../mappers/options"

const page = ref({} as any)

useHead({
  title: page.value.title || "Clavis - Workshops",
  meta: [
    {
      name: "description",
      content:
        page.value.description ||
        "That's a page that contains information about all workshops available at Clavis",
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
  age: undefined,
})

const { data: workshops, pending } = await useAsyncData(
  "workshops",
  () =>
    $fetch(
      `https://api.clavis.the-o.co/api/v2/wagtail/products/?fields=*&type=Workshop${filters.value.age ? `&age_group=${filters.value.age}` : ""}`,
    ),
  { watch: [filters] },
);
</script>
