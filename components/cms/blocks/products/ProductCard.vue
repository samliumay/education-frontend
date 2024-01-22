<template>
  <div class="flex flex-col justify-between gap-4 rounded-[12px] bg-white">
    <div class="flex flex-col gap-4">
      <div class="rounded-[12px] overflow-hidden relative h-[260px]">
        <ImageBlock
          :image="blockData.title_image"
          class="absolute bottom-0 right-6 w-5/12"
        />
        <ImageBlock
          :image="blockData.background_image"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex gap-2 items-center">
          <!-- TODO: Use CategoryBlock -->
          <template v-for="(category, index) in categories" :key="category">
            <p class="text-brand-gray font-medium">{{ category }}</p>

            <svg
              v-if="index !== categories.length - 1"
              width="6"
              height="6"
              viewBox="0 0 6 6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3" cy="3" r="3" fill="#6F6F6F" />
            </svg>
          </template>
        </div>

        <h2 class="text-[24px] font-medium uppercase text-brand-red">
          {{ blockData.name }}
        </h2>

        <TagsBlock :tags="tags" />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div
          v-for="item in schedule"
          :key="item.id"
          class="flex gap-4 items-center"
        >
          <p class="whitespace-nowrap">{{ item.start }}</p>

          <div class="flex-grow flex-shrink-0 flex items-center relative">
            <div class="h-[1px] w-full bg-brand-gray mr-[4px]" />
            <div class="absolute right-0 text-brand-gray text-xl">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
                  fill="#6F6F6F"
                />
              </svg>
            </div>
          </div>

          <p class="whitespace-nowrap">{{ item.end }}</p>
        </div>
      </div>

      <AppButton class="mt-[24px] !bg-brand-light-gray" @click="goToDetails">
        Подробнее
      </AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import { useCatalogApi } from '../../../../composables/api/useCatalogApi'
import type { PageBlock } from '../../../../types/cms'
import AppButton from '../../../AppButton.vue'
import TagsBlock from '../../../misc/TagsBlock.vue'
import ImageBlock from '../misc/ImageBlock.vue'

const props = defineProps<{
  blockData: PageBlock
}>()

const goToDetails = () => {
  navigateTo(`/product/${props.blockData?.id}`)
}

// Catalog
const removeLocalhost = (url: string) => url.replace('http://localhost', '')
const catalogAddress = props?.blockData?.catalog?.meta?.detail_url ?? ''
const { data: catalog } = await useCatalogApi(removeLocalhost(catalogAddress))

// Categories
const categories = computed(() => {
  const bufferArray = []

  // Catalog
  if (typeof catalog.value?.name === 'string' && catalog.value?.name) {
    bufferArray.push(catalog.value.name)
  }

  // Language
  if (
    typeof props.blockData?.language === 'string' &&
    props.blockData.language
  ) {
    bufferArray.push(props.blockData.language.toLocaleUpperCase())
  }

  return bufferArray
})

// Tags
const tags = computed(() => {
  const bufferArray = []

  // Age
  if (
    typeof props.blockData?.age_group === 'string' &&
    props.blockData?.age_group
  ) {
    bufferArray.push(`${props.blockData?.age_group} Лет`)
  }

  // Status
  if (
    typeof props.blockData?.current_status === 'string' &&
    props.blockData?.current_status
  ) {
    bufferArray.push(props.blockData?.current_status)
  }

  return bufferArray
})

const getScheduleDate = (dayOfWeek: string, time: string) => {
  const dayIndexes = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  const targetDayIndex = dayIndexes.indexOf(dayOfWeek.toLowerCase())

  if (targetDayIndex === -1) {
    throw new Error('Invalid day of week')
  }

  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(0)
  date.setMilliseconds(0)

  // Calculate the day of the week we need to move to
  let dayDiff = (targetDayIndex - date.getDay() + 7) % 7
  if (dayDiff === 0 && date < new Date()) {
    // If the specified time has already passed today, move to the next week
    dayDiff = 7
  }
  date.setDate(date.getDate() + dayDiff)

  // Format the date as day.month
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${day}.${month}`
}

// Schedule
const schedule = computed(() => {
  const bufferArray = []

  props.blockData.schedule_slots.forEach(element => {
    bufferArray.push({
      start: `${element.weekday.substring(0, 2)} ${getScheduleDate(
        element.weekday,
        element.start,
      )}`,
      end: `${element.end.substring(0, 5)} UHR`,
      id: element.id,
    })
  })

  return bufferArray
})
</script>
