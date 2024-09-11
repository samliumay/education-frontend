<template>
  <AppSignIn :is-open="isOpenSignIn" @close="isOpenSignIn = false" />
  <div
    class="flex flex-col justify-between gap-4 rounded-[12px] bg-white"
    data-cms="product-card"
    @click="goToDetails(isOpenSignIn)"
  >
    <div class="flex flex-col gap-4">
      <Cover
        class="xl:h-[220px] lg:h-[260px] w-full"
        :image-title="blockData.title_image"
        :image-background="blockData.background_image"
        :category="String(blockData?.product_type).toLocaleLowerCase()"
        :age-group="String(blockData?.age_group).toLocaleLowerCase()"
      />

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

        <h2
          class="text-2xl md:text-4xl font-medium uppercase leading-tight"
          :class="isGreenText ? 'text-brand-green' : 'text-brand-red'"
        >
          {{ blockData.name }}
        </h2>

        <TagsBlock :tags="tags" />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <template v-if="blockData.product_type !== 'Academy'">
          <div
            v-for="item in schedule"
            :key="item.id"
            class="flex gap-4 items-center"
          >
            <p class="whitespace-nowrap font-medium">{{ item.start }}</p>

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

            <p class="whitespace-nowrap font-medium">{{ item.end }}</p>
          </div>
        </template>
        <template v-else>
          <div class="flex gap-4 items-center">
            <p class="whitespace-nowrap font-medium">
              {{ (blockData?.start_date ?? '').split('-').reverse().join('.') }}
            </p>

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

            <p class="whitespace-nowrap font-medium">
              {{ (blockData?.end_date ?? '').split('-').reverse().join('.') }}
            </p>
          </div>
        </template>
      </div>
      <div>
        <AppButton
            class="justify-start mt-4 mr-4"
            @click="user.isLoggedIn?
              navigateTo(`/product/buy/${props.blockData.slug}`): isOpenSignIn = true
            "
          >
            {{
              $t('common.actions.buyAcademia')
            }}
          </AppButton>
        <AppButton class="mt-[24px] !bg-brand-light-gray cursor-pointer">
          {{ $t('common.moreDetails') }}
        </AppButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import { useCatalogApi } from '../../../../composables/api/useCatalogApi'
import type { PageBlock } from '../../../../types/cms'
import { getNearDate } from '../../../../utils/getNearDate'
import AppButton from '../../../AppButton.vue'
import TagsBlock from '../../../misc/TagsBlock.vue'
import Cover from '../misc/Cover.vue'
import { useUserStore } from '../../../../store/user'

const user = useUserStore()

const isOpenSignIn = ref(false)


const props = defineProps<{
  blockData: PageBlock
  isGreenText?: boolean
}>()

const goToDetails = (isOpenSignIn: boolean) => {
  if(!isOpenSignIn){
    navigateTo(`/product/${props.blockData?.slug || props.blockData?.id}`)
  }
  
}

const { t } = useI18n()

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

  if (
    typeof props.blockData?.category === 'string' &&
    props.blockData?.category
  ) {
    bufferArray.push(props.blockData?.category)
  }

  return bufferArray
})

// Tags
const tags = computed(() => {

  console.log("loglogloglog", user.isLoggedIn)
  const bufferArray = []

  // Age
  if (
    typeof props.blockData?.age_group === 'string' &&
    props.blockData?.age_group
  ) {
    bufferArray.push(`${props.blockData?.age_group} ${t('common.age')}`)
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

// Schedule
const schedule = computed(() => {
  const bufferArray: unknown[] = []

  props.blockData.schedule_slots.forEach(element => {
    bufferArray.push({
      start:
        `${t(`common.weekdays.short.${element.weekday.toLowerCase()}`)} ` +
        `${getNearDate(element.weekday, element.start)}`,
      end: `${element.start.substring(0, 5)} UHR`,
      id: element.id,
    })
  })

  return bufferArray
})
</script>
