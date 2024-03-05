<template>
  <div
    class="block-padding flex flex-col items-center max-w-[1116px]"
    data-cms="main-social-media"
  >
    <AppHeading>
      {{ blockData.value.heading }}
    </AppHeading>

    <div class="flex flex-col gap-2">
      <div class="flex flex-col lg:flex-row gap-5 lg:h-[260px]">
        <NuxtLink
          v-if="blockData.value.media_card[0]"
          :to="blockData.value?.media_card[0]?.media_link ?? '/'"
          target="_blank"
          class="flex gap-25 py-2 lg:py-0 justify-between lg:w-7/12 rounded-lg border-2 border-brand-dark-gray px-5 hover:bg-brand-light-gray cursor-pointer overflow-hidden"
        >
          <div class="flex flex-col justify-center gap-4 w-6/12">
            <div class="w-fit h-fit">
              <ImageBlock
                :image="blockData.value.media_card[0].icon"
                class="w-[90px] h-[90px] mb-1"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">
                  {{ blockData.value.media_card[0].title }}
                </p>
                <img
                  src="/icons/chevron_left.svg"
                  class="w-[8px] h-[18px]"
                  alt="youtube"
                />
              </div>
            </div>

            <p class="text-brand-gray">
              {{ blockData.value.media_card[0].description }}
            </p>
          </div>

          <div class="flex w-7/12 justify-end ml-1">
            <ImageBlock
              :image="blockData.value.media_card[0].background_image"
              class="h-full"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          v-if="blockData.value.media_card[1]"
          :to="blockData.value?.media_card[1]?.media_link ?? '/'"
          target="_blank"
          class="flex gap-5 py-2 lg:py-0 justify-between lg:w-5/12 rounded-lg border-2 border-brand-dark-gray px-5 hover:bg-brand-light-gray cursor-pointer overflow-hidden"
        >
          <div class="flex flex-col justify-center gap-4 w-6/12">
            <div class="w-fit h-fit">
              <ImageBlock
                :image="blockData.value.media_card[1].icon"
                class="w-[90px] h-[90px] mb-1"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">
                  {{ blockData.value.media_card[1].title }}
                </p>
                <img
                  src="/icons/chevron_left.svg"
                  class="w-[8px] h-[18px]"
                  alt="facebook"
                />
              </div>
            </div>

            <p class="text-brand-gray">
              {{ blockData.value.media_card[1].description }}
            </p>
          </div>

          <div class="flex w-5/12 justify-end pt-8 pr-5">
            <ImageBlock
              :image="blockData.value.media_card[1].background_image"
              class="h-full"
            />
          </div>
        </NuxtLink>
      </div>

      <div class="flex flex-col lg:flex-row gap-2 lg:h-[260px]">
        <NuxtLink
          v-if="blockData.value.media_card[2]"
          target="_blank"
          :to="blockData.value?.media_card[2]?.media_link ?? '/'"
          class="flex gap-5 py-2 lg:py-0 justify-between lg:w-5/12 rounded-lg border-2 border-brand-dark-gray px-5 hover:bg-brand-light-gray cursor-pointer overflow-hidden"
        >
          <div class="flex flex-col justify-center gap-4 w-6/12">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-fit h-fit"
            >
              <ImageBlock
                :image="blockData.value.media_card[2].icon"
                class="w-[90px] h-[90px] mb-1"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">
                  {{ blockData.value.media_card[2].title }}
                </p>
                <img
                  src="/icons/chevron_left.svg"
                  class="w-[8px] h-[18px]"
                  alt="chevron_left"
                />
              </div>
            </a>

            <p class="text-brand-gray">
              {{ blockData.value.media_card[2].description }}
            </p>
          </div>

          <div class="flex w-fit h-fit pr-5 pt-5">
            <ImageBlock
              :image="blockData.value.media_card[2].background_image"
              class="max-h-[110px] max-w-[75px]"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          v-if="blockData.value.media_card[3]"
          target="_blank"
          :to="blockData.value?.media_card[3]?.media_link ?? '/'"
          class="flex gap-5 py-2 lg:py-0 justify-between lg:w-7/12 rounded-lg border-2 border-brand-dark-gray px-5 hover:bg-brand-light-gray cursor-pointer overflow-hidden"
        >
          <div class="flex flex-col justify-center gap-4 w-6/12">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-fit h-fit"
            >
              <ImageBlock
                :image="blockData.value.media_card[3].icon"
                class="w-[90px] h-[90px] mb-1"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">
                  {{ blockData.value.media_card[3].title }}
                </p>
                <img
                  src="/icons/chevron_left.svg"
                  class="w-[8px] h-[18px]"
                  alt="facebook"
                />
              </div>
            </a>

            <p class="text-brand-gray">
              {{ blockData.value.media_card[3].description }}
            </p>
          </div>

          <div class="flex w-5/12 justify-end">
            <ImageBlock
              :image="blockData.value.media_card[3].background_image"
              class="h-full"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppHeading from '@/components/AppHeading.vue'

import type { PageBlock } from '../../../../types/cms'
import ImageBlock from '../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
