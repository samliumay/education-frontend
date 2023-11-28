<template>
  <div>
    <div class="flex justify-center mt-5">
      <n-icon size="100">
        <EyeSlashRegular />
      </n-icon>
    </div>
    <n-h2 class="flex justify-center"> {{ $t("common.notFound") }}</n-h2>
    <NuxtLink to="/" class="flex justify-center">
      <n-button>{{ $t("common.goToMain") }}</n-button>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { EyeSlashRegular } from "@vicons/fa"
import { NButton, NH2, NIcon } from "naive-ui"
</script>
