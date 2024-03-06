<template>
  <template v-if="type === 'special'">
    <AppModalSpecial
      v-if="isOpenModalCourse"
      :is-open="isOpenModalCourse"
      :item-id="id"
      @close="isOpenModalCourse = false"
    />
  </template>
  <template v-else>
    <AppModalCourse
      v-if="isOpenModalCourse"
      :is-open="isOpenModalCourse"
      @close="isOpenModalCourse = false"
    />
  </template>
  <div
    class="flex flex-col gap-[48px] px-10"
    data-cms="product-details-header-block"
  >
    <div class="flex flex-col md:flex-row justify-between gap-4 mr-12">
      <div class="flex flex-col justify-between gap-10">
        <div>
          <TagsBlock :tags="[blockData.current_status]" />
          <h1
            class="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 mt-4 max-w-[90%]"
          >
            {{ blockData.name }}
          </h1>
          <CategoryBlock
            :items="
              blockData.product_type === 'Academy'
                ? blockData.purchase_options
                : blockData.schedule_slots
            "
            :is-academy="blockData.product_type === 'Academy'"
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
          <AppButton
            v-if="type === 'course' || type === 'event' || type === 'special'"
            class="!bg-brand-red text-white"
            @click="isOpenModalCourse = true"
          >
            {{
              type === 'special'
                ? $t('common.actions.submitApplication')
                : $t('common.actions.tryFree')
            }}
          </AppButton>
          <slot />
        </div>
      </div>

      <div class="flex flex-col gap-1 pt-12">
        <p>
          <span class="font-medium">{{ $t('blocks.product.age') }}</span>
          <span class="text-gray-400 ml-[8px]">{{ blockData.age_group }}</span>
        </p>

        <p>
          <span class="font-medium">{{ $t('blocks.product.language') }}</span>
          <span class="text-gray-400 ml-[8px]">
            {{ $t(`common.languages.${blockData.language}`) }}
          </span>
        </p>

        <p>
          <span class="font-medium">{{ $t('blocks.product.tutors') }}</span>
          <template v-if="blockData?.instructors?.length">
            {{
              Array.from(
                new Set(
                  blockData.instructors?.map(
                    (item: any) =>
                      `${item?.instructor?.first_name ?? 'John'} ${
                        item?.instructor?.last_name ?? 'Doe'
                      }`,
                  ),
                ),
              ).join('; ')
            }}
          </template>
          <template v-else>-</template>
        </p>

        <p>
          <span class="font-medium">{{ $t('blocks.product.place') }}</span>
          <span class="text-gray-400 ml-[8px]">
            <template v-if="blockData?.schedule_slots?.length">
              {{
                Array.from(
                  new Set(
                    blockData.schedule_slots?.map((slot: any) => slot.space),
                  ),
                ).join('; ')
              }}
            </template>
            <template v-else>-</template>
          </span>
        </p>
      </div>
    </div>

    <Cover
      :image-title="blockData.title_image"
      :image-background="blockData.background_image"
      class="xl:h-[680px] lg:h-[540px] w-full"
      :category="type"
      :age-group="blockData?.age_group"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import AppModalCourse from '@/components/modals/AppModalCourse.vue'
import AppModalSpecial from '@/components/modals/AppModalSpecial.vue'

import { type Product, type ProductType } from '../../../../../types'
import { type PageBlock } from '../../../../../types/cms'
import CategoryBlock from '../../../../misc/CategoryBlock.vue'
import TagsBlock from '../../../../misc/TagsBlock.vue'
import Cover from '../../misc/Cover.vue'

defineProps<{
  blockData: PageBlock & { product: Product }
  type: ProductType
  id?: number
}>()

const isOpenModalCourse = ref(false)
</script>
