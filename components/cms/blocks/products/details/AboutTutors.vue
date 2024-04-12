<template>
  <div
    class="bg-brand-light-gray relative text-brand-black block-padding-x block-padding-y"
    data-cms="products-details-about-tutors"
  >
    <div
      class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray"
    />

    <img src="/icons/tutors.svg" alt="Tutors" class="absolute top-20 left-0" />

    <h2
      class="text-3xl sm:text-4xl md:text-[56px] uppercase font-medium mb-12 relative"
    >
      {{ $t('common.tutors') }}
    </h2>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] relative"
    >
      <template v-for="(item, index) in blockData" :key="item.id">
        <div
          v-if="
            (index - 2) % 9 === 0 ||
            ((index - 5) % 9 === 0 &&
              (index !== 5 || !(withAllInstructors || hasButton)))
          "
          class="hidden lg:block"
        />
        <div
          v-if="index - 2 === 0 && hasButton"
          class="hidden lg:flex flex-col rounded-[100%] bg-brand-yellow justify-center items-center aspect-square"
        >
          <p class="text-4xl font-medium text-center">
            {{ $t('common.allTeachers') }}
          </p>
          <p
            class="text-xl font-medium text-center underline cursor-pointer"
            @click="navigateTo('/instructors')"
          >
            {{ $t('common.go') }}
          </p>
        </div>
        <TutorCard
          :instructor="{ ...item.instructor, ...item, id: item?.id ?? 1 }"
        />
      </template>
      <AppButton class="block lg:hidden" @click="navigateTo('/instructors')">
        {{ $t('common.allTeachers') }}
      </AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

import type { PageBlock } from '../../../../../types/cms'
import TutorCard from '../../misc/TutorCard.vue'

defineProps<{
  blockData: PageBlock[]
  withAllInstructors: boolean
  hasButton?: boolean
}>()
</script>
