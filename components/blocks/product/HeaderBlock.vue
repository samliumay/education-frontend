<template>
  <div class="grid grid-cols-3 gap-[48px]">
    <div class="col-span-2 flex flex-col justify-between">
      <div>
        <h1 class="text-[36px] font-medium">
          {{ item.product.name }}
        </h1>
        <CategoryBlock :items="item.product.schedule_slots" class="mt-[24px]">
          <template #icon>
            <img
              v-if="type === 'course'"
              src="../../../assets/icons/products/course_calendar.svg"
              alt="Schedule icon"
              class="mr-[8px]"
            />
            <img
              v-else
              src="../../../assets/icons/products/other_clock.svg"
              alt="Schedule icon"
              class="mr-[8px]"
            />
          </template>
        </CategoryBlock>
      </div>

      <div class="flex gap-[12px]">
        <AppButton v-if="type === 'course'"> Попробовать бесплатно </AppButton>
        <AppButton is-inverted> Купить </AppButton>
      </div>
    </div>

    <div class="flex flex-col gap-[4px]">
      <dl>
        <dd class="font-medium">Направление:</dd>
        <dt class="text-gray-400 ml-[8px]">{{ item.category }}</dt>
      </dl>

      <dl>
        <dd class="font-medium">Возраст:</dd>
        <dt class="text-gray-400 ml-[8px]">{{ item.age_group }}</dt>
      </dl>

      <dl>
        <dd class="font-medium">Язык:</dd>
        <dt class="text-gray-400 ml-[8px]">
          {{ languageMap[item.language as keyof typeof languageMap] }}
        </dt>
      </dl>

      <dl>
        <dd class="font-medium">Преподаватели:</dd>
        <dt class="text-gray-400 ml-[8px]">
          {{
            Array.from(
              new Set(item.schedule_slots?.map((slot: any) => slot.instructor)),
            ).join("; ")
          }}
        </dt>
      </dl>

      <dl>
        <dd class="font-medium">Кабинет:</dd>
        <dt class="text-gray-400 ml-[8px]">
          {{
            Array.from(
              new Set(item.schedule_slots?.map((slot: any) => slot.space)),
            ).join("; ")
          }}
        </dt>
      </dl>
    </div>
  </div>
</template>
<script setup lang="ts">
import { languageMap } from "../../../mappers/products"
import { type PageBlock, type Product, type ProductType } from "../../../types"
import AppButton from "../../AppButton.vue"
import CategoryBlock from "../../misc/CategoryBlock.vue"

defineProps<{
  item: PageBlock & { product: Product };
  type: ProductType;
}>()
</script>
