<template>
  <div class="block-padding-x gap-10 flex flex-col">
    <h2
      class="font-semibold text-[48px] lg:text-[56px] text-brand-black uppercase text-center mb-4 lg:mb-12"
    >
      {{ blockData.value.title }}
    </h2>
    <div
      class="bg-brand-light-gray rounded-[12px] p-3 lg:p-6 grid grid-cols-1 lg:grid-cols-6"
    >
      <div class="flex items-center col-span-2">
        <h3
          class="text-[36px] lg:text-[48px] text-brand-red font-semibold uppercase"
        >
          {{ blockData.value.contents?.top_pane?.title }}
        </h3>
      </div>

      <div class="col-span-3 self-center">
        <div
          v-for="course in blockData.value.contents?.top_pane?.tags"
          :key="course.inner_text + course.link"
          class="border-[1px] border-brand-black rounded-[48px] py-2 px-3 items-center inline-block mr-2 mb-2 cursor-pointer"
        >
          <a
            class="w-full h-full flex items-center"
            :href="course.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/star.svg" alt="Star" class="mr-1" />
            {{ course.inner_text }}
          </a>
        </div>
      </div>

      <div class="flex items-start lg:justify-end">
        <ImageBlock
          :image="blockData.value.contents?.top_pane?.icon"
          image-class="mr-1"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 -mt-6">
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 lg:p-6 relative overflow-hidden"
      >
        <div class="absolute left-[60%] w-2/5 top-0 h-full">
          <ImageBlock
            :image="blockData.value.contents?.left_pane.photo"
            image-class="absolute hidden sm:block max-w-full max-h-full w-auto h-auto top-1/2 -translate-y-1/2"
          />
        </div>
        <div class="relative w-full sm:w-3/5 z-10">
          <h3
            class="text-[36px] lg:text-[48px] text-brand-red font-semibold leading-tight uppercase"
          >
            {{ blockData.value.contents?.left_pane.title }}
          </h3>
          <p class="font-medium mt-3 lg:mt-6 text-brand-gray">
            {{ blockData.value.contents?.left_pane.inner_text }}
          </p>
        </div>
      </div>

      <div
        class="bg-brand-light-gray rounded-[12px] p-3 lg:p-6 relative overflow-hidden"
      >
        <div class="absolute left-[60%] w-2/5 top-0 h-full">
          <ImageBlock
            :image="blockData.value.contents?.right_pane.photo"
            image-class="absolute hidden sm:block max-w-full max-h-full w-auto h-auto top-1/2 -translate-y-1/2"
          />
        </div>
        <div class="relative w-full sm:w-3/5 z-10 bg-brand-light-gray">
          <h3
            class="text-[36px] lg:text-[48px] text-brand-red font-semibold leading-tight uppercase"
          >
            {{ blockData.value.contents?.right_pane.title }}
          </h3>
          <p class="font-medium mt-3 lg:mt-6 text-brand-gray">
            {{ blockData.value.contents?.right_pane.inner_text }}
          </p>
        </div>
      </div>
    </div>
    <ContactsBlock />
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'
import ContactsBlock from '../../../misc/ContactsBlock.vue'
import ImageBlock from '../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
