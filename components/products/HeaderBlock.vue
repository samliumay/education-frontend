<template>
  <div class="grid grid-cols-2 gap-[24px] mx-[48px]">
    <div class="rounded-[12px] bg-white p-[36px]">
      <h1 class="text-[36px] font-medium">
        {{ product.name }}
      </h1>

      <TagsBlock class="mt-16px" :tags="getTagsFromProduct(product)" />

      <dl class="mt-[24px]">
        <div v-for="detail in details" :key="detail.key" class="flex">
          <dt class="text-[16px] font-medium">
            {{ detail.key }}
          </dt>
          &nbsp;
          <dd class="text-[16px] text-gray-700">
            {{ detail.value }}
          </dd>
        </div>
      </dl>

      <CategoryBlock class="mt-[24px]" :items="product.schedule_slots">
        <template #icon>
          <CourseIcon
            v-if="type === 'course'"
            alt="Items icon"
            class="mr-[8px]"
          />
          <AcademyIcon
            v-if="type === 'academy'"
            alt="Items icon"
            class="mr-[8px]"
          />
          <WorkshopIcon
            v-if="type === 'workshop'"
            alt="Items icon"
            class="mr-[8px]"
          />
        </template>
      </CategoryBlock>

      <div class="flex gap-[12px] items-center mt-[36px]">
        <slot />
      </div>
    </div>

    <div class="relative rounded-[12px] overflow-hidden">
      <img
        v-if="product.photo"
        :src="product.photo"
        class="rounded-[12px]"
        alt="Course image"
      />
      <div v-else class="aspect-video bg-gray-100 rounded-[12px] h-full" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue"

import AcademyIcon from "../../assets/icons/products/academy_category.svg"
import CourseIcon from "../../assets/icons/products/course_category.svg"
import WorkshopIcon from "../../assets/icons/products/workshop_category.svg"
import { getTagsFromProduct } from "../../helpers/products"
import { ageMap, languageMap } from "../../mappers/products"
import type { Product } from "../../types"
import CategoryBlock from "../misc/CategoryBlock.vue"
import TagsBlock from "../misc/TagsBlock.vue"

const props = defineProps<{
  product: Product;
  type: "course" | "academy" | "workshop";
}>()

const details = computed(() => [
  {
    key: "Направление: ",
    value: "Изобразительное искусство",
  },
  {
    key: "Возраст: ",
    value: ageMap[props.product.age_group as keyof typeof ageMap],
  },
  {
    key: "Язык: ",
    value: languageMap[props.product.language as keyof typeof languageMap],
  },
  {
    key: "Преподаватели: ",
    value: Array.from(
      new Set(props.product.schedule_slots?.map(slot => slot.instructor)),
    ).join("; "),
  },
  {
    key: "Кабинет: ",
    value: Array.from(
      new Set(props.product.schedule_slots?.map(slot => slot.space)),
    ).join("; "),
  },
])
</script>
