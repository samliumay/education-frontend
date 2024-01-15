<template>
  <div class="flex flex-col justify-between gap-4 rounded-[12px] bg-white">
    <div class="flex flex-col gap-4">
      <div class="rounded-[12px] overflow-hidden relative">
        <img
          :src="`https://api.clavis.the-o.co${title_image.meta.download_url}`"
          alt="Title image"
          class="absolute bottom-0 right-6 w-5/12"
        />
        <img
          :src="`https://api.clavis.the-o.co${background_image.meta.download_url}`"
          alt="Background image"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="flex flex-col gap-1">
        <!-- <div class="flex gap-2 items-center">
          <template v-for="(category, index) in categories" :key="category">
            <p>{{ category }}</p>

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
        </div> -->

        <h2 class="text-[24px] font-medium uppercase text-brand-red">
          {{ name }}
        </h2>

        <!-- <TagsBlock :tags="tags" /> -->
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div
          v-for="schedule in schedule_slots"
          :key="schedule.id"
          class="flex gap-4 items-center"
        >
          <p class="w-[70px]">{{ schedule.start }} {{ schedule.weekday }}</p>

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

          <p class="w-[80px]">{{ schedule.end }}</p>
        </div>
      </div>

      <AppButton class="mt-[24px] !bg-brand-light-gray" @click="goToProductInfo">Подробнее</AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppButton from '../AppButton.vue'

const props = defineProps<{
  name: string
  tags: Array<string>
  title_image?: string
  background_image?: string
  schedule_slots?: string
  productType: string
  id: number
}>()

const goToProductInfo = () => {
  navigateTo(`/${props.productType}/${props.id}`)
}
</script>
