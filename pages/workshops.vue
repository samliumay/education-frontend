<template>
  <div class="flex items-start mt-[96px] mx-[28px] md:mx-[48px] flex-col justify-start md:flex-row md:justify-between">
    <div class="flex items-center gap-[18px]">
      <h1 class="text-[38px] md:text-[48px] font-medium uppercase">Воркшопы</h1>
      <img src="../assets/icons/products/workshop_cloud.svg" class="w-[60px] md:w-[80px]" alt="cloud" />
    </div>

    <div class="flex items-center gap-[12px] w-[200px]">
      <n-select
        v-model:value="filters.age"
        placeholder="Возраст"
        clearable
        :options="ageOptions"
      />
    </div>
  </div>

  <div class="mt-[48px] mb-[96px] grid gap-[24px] mx-[28px] md:mx-[48px] grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <ProductCard
      v-for="workshop in workshops"
      :key="workshop.id"
      :name="workshop.name"
      :times="workshop.schedule_slots"
      type="workshop"
      :tags="getTagsFromProduct(workshop)"
      @click="navigateTo(`/workshop/${workshop.id}`)"
    />
  </div>
</template>
<script setup lang="ts">
import { NSelect } from "naive-ui"
import { ref } from "vue"

import ProductCard from "../components/products/ProductCard.vue"
import { getTagsFromProduct } from "../helpers/products"
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

const { data: workshops } = await useAsyncData(
  "courses",
  () =>
    $fetch(
      `https://api.clavis.the-o.co/api/v1/products/?${new URLSearchParams({
        type: "Workshop",
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
