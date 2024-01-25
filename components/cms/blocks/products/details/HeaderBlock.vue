<template>
  <div class="flex flex-col gap-[48px] px-10">
    <div class="flex justify-between gap-4">
      <div class="flex flex-col justify-between gap-10">
        <div>
          <TagsBlock :tags="[item.current_status]" />
          <h1 class="text-3xl sm:text-4xl font-medium mb-4 mt-4">
            {{ item.name }}
          </h1>
          <CategoryBlock
            :items="item.schedule_slots"
          >
            <template #icon>
              <img
                v-if="type === 'course'"
                src="/icons/products/course_calendar.svg"
                alt="Schedule icon"
                class="mr-[8px]"
              />
              <img
                v-else
                src="/icons/products/other_clock.svg"
                alt="Schedule icon"
                class="mr-[8px]"
              />
            </template>
          </CategoryBlock>
        </div>

        <div class="flex gap-[12px]">
          <!-- <AppButton v-if="type === 'course'" class="bg-brand-red text-white">
            Попробовать бесплатно
          </AppButton>
          <AppButton> Купить </AppButton> -->
          <slot />
        </div>
      </div>

      <div class="flex flex-col gap-1 pt-12">
        <p>
          <span class="font-medium">Возраст:</span>
          <span class="text-gray-400 ml-[8px]">{{ item.age_group }}</span>
        </p>

        <p>
          <span class="font-medium">Язык:</span>
          <span class="text-gray-400 ml-[8px]">
            {{ languageMap[item.language as keyof typeof languageMap] }}
          </span>
        </p>

        <p>
          <span class="font-medium">Преподаватели:</span>
          <template v-if="item?.schedule_slots?.length">
            {{
              Array.from(
                new Set(
                  item.schedule_slots?.map((slot: any) => slot.instructor),
                ),
              ).join('; ')
            }}
            </template>
            <template v-else>-</template>
        </p>

        <p>
          <span class="font-medium">Кабинет:</span>
          <span class="text-gray-400 ml-[8px]">
            <template v-if="item?.schedule_slots?.length">
              {{
                Array.from(
                  new Set(item.schedule_slots?.map((slot: any) => slot.space)),
                ).join('; ')
              }}
            </template>
            <template v-else>-</template>
          </span>
        </p>
      </div>
    </div>

    <div class="rounded-[12px] overflow-hidden relative h-[580px] w-full">
      <ImageBlock
        :image="item.title_image"
        class="absolute bottom-0 right-6 h-[400px]"
      />
      <ImageBlock
        :image="item.background_image"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { languageMap } from '../../../../../mappers/products'
import { type Product, type ProductType } from '../../../../../types'
import { type PageBlock } from '../../../../../types/cms'
import CategoryBlock from '../../../../misc/CategoryBlock.vue'
import TagsBlock from '../../../../misc/TagsBlock.vue'
import ImageBlock from '../../misc/ImageBlock.vue'

defineProps<{
  item: PageBlock & { product: Product }
  type: ProductType
}>()
</script>
