<template>
  <div class="grid grid-cols-3 gap-30 px-3 sm:px-10">
    <div class="hidden sm:block col-span-1">
      <Gallery :photos="instructor?.photo" />
    </div>
    <div class="sm:col-span-2">
      <n-breadcrumb>
        <n-breadcrumb-item сlass="text-brand-gray">
          <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
        </n-breadcrumb-item>
        <n-breadcrumb-item сlass="text-brand-gray">
          <NuxtLink to="/instructors">{{ $t('common.tutors') }}</NuxtLink>
        </n-breadcrumb-item>
        <n-breadcrumb-item сlass="text-brand-gray">
          {{ `${instructor?.first_name} ${instructor?.last_name}` }}
        </n-breadcrumb-item>
      </n-breadcrumb>

      <h1
        class="text-[32px] sm:text-[48px] text-brand-red mt-4 sm:mt-12 font-medium"
      >
        {{ `${instructor?.first_name} ${instructor?.last_name}` }}
      </h1>
      <h2 class="text-[16px] sm:text-[20px] font-medium mt-3">
        {{ instructor?.job }}
      </h2>
      <AppDivider class="my-4 sm:my-9" />
      <p>
        <RichText :html="instructor?.description" />
      </p>
    </div>
    <div class="block sm:hidden col-span-1">
      <Gallery :photos="instructor?.photo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

import type { Instructor } from '../../../../types/index'
import AppDivider from '../../../AppDivider.vue'
import Gallery from '../../../misc/Gallery.vue'
import RichText from '../misc/RichText.vue'

defineProps<{
  instructor: Instructor
}>()
</script>
