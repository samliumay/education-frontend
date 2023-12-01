<template>
  <p class="text-[24px] font-medium">Введите данные ребенка</p>

  <form class="flex flex-col gap-[12px] mt-[16px]">
    <AppInput
      :model-value="child.name"
      placeholder="Имя ребенка"
      @update:model-value="
        $emit('update:child', { ...child, name: $event.target.value })
      "
    />
    <AppInput
      :model-value="child.surname"
      placeholder="Фамилия ребенка"
      @update:model-value="
        $emit('update:child', { ...child, surname: $event.target.value })
      "
    />
    <AppInput
      :model-value="child.birthdate"
      placeholder="Дата рождения ребенка"
      @update:model-value="
        $emit('update:child', { ...child, birthdate: $event.target.value })
      "
    />
  </form>
</template>
<script setup lang="ts">
import AppInput from "../AppInput.vue"

defineProps<{
  child: {
    name: string;
    surname: string;
    birthdate: string;
  };
}>()

defineEmits(["update:child"])
</script>
