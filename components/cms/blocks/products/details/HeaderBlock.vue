<template>
  <div class="flex flex-col gap-[48px] px-10">
    <div class="flex justify-between gap-4 mr-12">
      <div class="flex flex-col justify-between gap-10">
        <div>
          <TagsBlock :tags="[blockData.current_status]" />
          <h1 class="text-3xl sm:text-4xl font-medium mb-4 mt-4">
            {{ blockData.name }}
          </h1>
          <CategoryBlock
            :items="blockData.schedule_slots"
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
          <span class="text-gray-400 ml-[8px]">{{ blockData.age_group }}</span>
        </p>

        <p>
          <span class="font-medium">Язык:</span>
          <span class="text-gray-400 ml-[8px]">
            {{ languageMap[blockData.language as keyof typeof languageMap] }}
          </span>
        </p>

        <p>
          <span class="font-medium">Преподаватели:</span>
          <span class="text-gray-400 ml-[8px]">
            <template v-if="blockData?.instructors?.length">
              {{
                `${ blockData.instructors.map(instructor => `${instructor.instructor.first_name } ${ instructor.instructor.last_name}`).join('; ')}`
              }}
            </template>
            <template v-else>-</template>
          </span>
        </p>

        <p>
          <span class="font-medium">Кабинет:</span>
          <span class="text-gray-400 ml-[8px]">
            <template v-if="blockData?.schedule_slots?.length">
              {{
                Array.from(
                  new Set(blockData.schedule_slots?.map((slot: any) => slot.space)),
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
        :image="blockData.title_image"
        class="absolute bottom-0 right-6 h-[400px]"
      />
      <ImageBlock
        :image="blockData.background_image"
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
  blockData: PageBlock & { product: Product }
  type: ProductType
}>()
</script>
