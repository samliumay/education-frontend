<template>
  <article>
    <n-h1>{{ $t("common.instructors") }}</n-h1>
    <Suspense>
      <template #fallback>
        <div class="flex justify-center">
          <n-spin size="large" />
        </div>
      </template>
      <InstructorsList />
    </Suspense>
  </article>
</template>
<script setup lang="ts">
// This component is implemented with Suspense just for experiment
import { NH1, NSpin } from "naive-ui"

import InstructorsList from "../components/InstructorsList.vue"
</script>
