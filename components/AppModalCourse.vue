<template>
  <Teleport to="body">
    <div class="w-full h-full bg-gray-500" @click="$emit('close')" />
    <div
      class="w-[calc(100% - 20px)] h-[calc(100% - 20px)] bg-gray-200 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
    >
      <div
        class="flex justify-end items-center border-b-[1px] border-black py-[16px]"
      >
        <div class="flex gap-[20px] items-center" @click="$emit('close')">
          Закрыть
          <Close />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-[44px] pt-[36px] px-[36px]">
        <div>
          <div class="flex items-start gap-[6px]">
            <CourseIcon />
            <h2 class="font-medium text-[24px] sm:text-[36px]">
              Рисование, Живопись, Лепка: Группы 5-7
            </h2>
          </div>

          <p class="font-medium mt-[36px]">
            Создаём проект города, рисуем мифических существ или рисуем пейзажи
            в японском стиле.
            <br />
            Узнаём интересные факты из истории искусства — от производства
            красок в древности до световых инсталляций в музеях современного
            искусства.
            <br />
            Мы пробуем разные техники и форматы и по ходу дела учимся
          </p>
        </div>

        <div>
          <h1 class="font-medium text-[32px] sm:text-[48px] mb-[36px]">Заполните данные</h1>

          <div class="grid grid-cols-2 gap-[12px]">
            <AppInput
              v-model="application.child.name"
              placeholder="Имя ребенка"
            />
            <AppInput
              v-model="application.child.surname"
              placeholder="Фамилия ребенка"
            />
          </div>

          <AppInput
            v-model="application.child.birthdate"
            class="mt-[12px]"
            placeholder="Дата рождения ребенка"
          />

          <div class="grid grid-cols-2 gap-[12px] mt-[12px]">
            <AppInput
              v-model="application.parent.name"
              placeholder="Имя родителя"
            />
            <AppInput
              v-model="application.parent.surname"
              placeholder="Фамилия родителя"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import CourseIcon from '../public/icons/Course.svg'
import Close from '../public/icons/cross.svg'
import AppInput from './AppInput.vue'

defineEmits(['close'])

const application = ref({
  child: {
    name: '',
    surname: '',
    birthdate: '',
  },
  parent: {
    name: '',
    surname: '',
  },
  email: '',
  phone: '',
})
</script>
