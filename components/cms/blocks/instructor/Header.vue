<template>
  <div class="m-10 grid grid-cols-1 lg:grid-cols-3 gap-30 px-3 lg:px-10">
    <div class="hidden lg:block col-span-1 mr-10">
      <ImageBlock
        :image="blockData?.title_image"
        class="w-full h-[450px] object-cover rounded-md overflow-hidden"
      />
    </div>
    <div class="lg:col-span-2 lg:ml-16">
      <n-breadcrumb>
        <n-breadcrumb-item сlass="text-brand-gray">
          <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
        </n-breadcrumb-item>
        <n-breadcrumb-item сlass="text-brand-gray">
          <NuxtLink to="/instructors">{{ $t('common.tutors') }}</NuxtLink>
        </n-breadcrumb-item>
        <n-breadcrumb-item сlass="text-brand-gray">
          {{ `${blockData?.name}` }}
        </n-breadcrumb-item>
      </n-breadcrumb>

      <h1
        class="text-3xl lg:[text-56px] text-brand-red mt-4 lg:mt-12 font-medium"
      >
        {{ `${blockData?.name}` }}
      </h1>
      <h2 class="text-[18px] lg:text-[20px] font-medium mt-3">
        {{ blockData?.speciality }}
      </h2>
      <AppDivider class="my-4 lg:my-9" />
      <p>
        <RichText :html="blockData?.description" />
      </p>
    </div>
    <!-- <div class="block lg:hidden col-span-1">
      <Gallery :photos="instructor?.gallery_images" />
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

import type { Instructor } from '../../../../types/index'
import AppDivider from '../../../AppDivider.vue'
// import Gallery from '../../../misc/Gallery.vue'
import ImageBlock from '../misc/ImageBlock.vue'
import RichText from '../misc/RichText.vue'

defineProps<{
  blockData: Instructor
}>()
</script>
