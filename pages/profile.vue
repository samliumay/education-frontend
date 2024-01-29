<template>
  <div class="pt-[96px] px-[16px] sm:px-[48px] bg-[#EAEAEA]">
    <h1 class="text-[32px] sm:text-[48px] font-medium">Личный кабинет</h1>

    <n-tabs v-model:value="activeTab" type="line" animated>
      <n-tab-pane name="profile" tab="Мой профиль">
        <div
          class="mt-[48px] grid grid-cols-1 sm:grid-cols-2 gap-[24px] bg-white rounded-[12px] p-[36px]"
        >
          <div>
            <div class="flex items-center gap-[16px]">
              <div class="bg-gray-200 rounded-[1000px] w-[96px] h-[96px]" />
              <div>
                <h2 class="text-[24px] font-medium">
                  {{
                    user?.user?.first_name
                      ? `${user.user.first_name} ${user.user.last_name}`
                      : 'Вы'
                  }}
                </h2>
                <p class="text-gray-400">
                  {{ user?.user?.email || 'Ваш email' }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-[12px]">
            <div class="flex flex-col sm:flex-row gap-[12px]">
              <div class="flex flex-col gap-[8px]">
                <p class="font-medium">Имя</p>
                <AppInput v-model="user.user.first_name" />
              </div>

              <div class="flex flex-col gap-[8px]">
                <p class="font-medium">Фамилия</p>
                <AppInput v-model="user.user.last_name" />
              </div>
            </div>

            <div class="flex flex-col gap-[8px]">
              <p class="font-medium">Почта</p>
              <AppInput
                v-model="user.user.email"
                placeholder="example@example.com"
                type="email"
              />
            </div>

            <div class="flex flex-col gap-[8px]">
              <p class="font-medium">Телефон</p>
              <AppInput
                v-model="user.user.phone_number"
                placeholder="Номер телефона"
                maska="+49 ### ###-##-##"
                type="tel"
              />
            </div>

            <AppButton
              class="mt-[24px] w-full"
              @click="user.updateUser(user.user)"
            >
              Сохранить
            </AppButton>
          </div>
        </div>

        <div
          class="my-[24px] grid grid-cols-1 sm:grid-cols-2 gap-[24px] bg-white rounded-[12px] p-[36px]"
        >
          <h2 class="text-[24px] font-medium">Смена пароля</h2>

          <div class="flex flex-col gap-[12px]">
            <AppInput
              v-model="passwordChange.new1"
              placeholder="Новый пароль"
              type="password"
            />
            <AppInput
              v-model="passwordChange.new2"
              placeholder="Повторите пароль"
              type="password"
            />
            <AppButton class="mt-[24px] w-full"> Сохранить </AppButton>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="visitors" tab="Мои дети">
        <div class="mt-[48px]" />
        <div
          v-for="visitor in user.visitorsOrders"
          :key="visitor.id"
          class="rounded-[12px] bg-white p-[36px] mb-[24px]"
        >
          <div class="flex flex-col sm:flex-row justify-between gap-[48px]">
            <div class="flex items-center gap-[16px]">
              <div class="bg-gray-200 rounded-[1000px] w-[96px] h-[96px]" />
              <h2 class="text-[24px] font-medium">
                {{
                  visitor?.first_name
                    ? `${visitor.first_name} ${visitor.last_name}`
                    : 'Ребенок'
                }}
              </h2>
            </div>

            <div class="flex flex-col sm:flex-row gap-[12px]">
              <div class="flex flex-col gap-[8px]">
                <p class="font-medium">Имя</p>
                <AppInput v-model="visitor.first_name" />
              </div>

              <div class="flex flex-col gap-[8px]">
                <p class="font-medium">Фамилия</p>
                <AppInput v-model="visitor.last_name" />
              </div>

              <div class="flex flex-col gap-[8px]">
                <p class="font-medium">Дата рождения</p>
                <AppInput v-model="visitor.birth_date" type="date" placeholder="2012-12-21" />
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-[24px] w-full sm:w-auto">
            <AppButton
              class="w-full"
              @click="user.updateVisitor(visitor.id, visitor)"
            >
              Сохранить
            </AppButton>
          </div>

          <AppDivider class="my-[36px]" />

          <ProductsTable :orders="visitor.orders" with-button />
        </div>
      </n-tab-pane>
      <n-tab-pane name="workshops" tab="Воркшопы">
        <div
          class="flex flex-col gap-[12px] bg-white p-[36px] rounded-[12px] mt-[48px] mb-[24px] overflow-x-auto"
        >
          <div
            class="grid grid-cols-4 gap-[12px] font-medium p-[16px] min-w-[800px]"
          >
            <p>Название</p>
            <p>Расписание</p>
            <p>Дата покупки</p>
            <p>Комментарий</p>
          </div>

          <template
            v-if="user.workshops?.length && user.workshops?.length !== 0"
          >
            <div
              v-for="workshop in user.workshopOrders"
              :key="workshop.id"
              class="grid grid-cols-4 gap-[12px] bg-gray-200 p-[16px] min-w-[800px]"
            >
              <p>{{ workshop.product.name }}</p>
              <p>Вт 12:55</p>
              <p>{{ new Date().toDateString() }}</p>
              <p class="text-blue-500 cursor-pointer">Смотреть</p>
            </div>
          </template>

          <template v-else>
            <div class="px-[16px] bg-gray-200 py-[20px] rounded-[12px]">
              Нет активных воркшопов
            </div>
          </template>
        </div>
      </n-tab-pane>
      <n-tab-pane name="sales" tab="История покупок">
        <div class="bg-white p-[36px] rounded-[12px] mt-[48px] mb-[24px]">
          <ProductsTable :orders="user.orders" />
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import AppButton from '../components/AppButton.vue'
import AppDivider from '../components/AppDivider.vue'
import AppInput from '../components/AppInput.vue'
import ProductsTable from '../components/profile/ProductsTable.vue'
import { useUserStore } from '../store/user'

// Init hooks
const route = useRoute()

// Store
const user = useUserStore()
await user.getVisitors()
await user.getOrdersByVisitors()
await user.getOrders()
await user.getWorkshopOrders()

user.visitorsOrders = user.visitors.map(visitor => ({
  ...visitor,
  orders: user.ordersByVisitors[visitor.id],
}))

// Refs
const passwordChange = ref({
  current: '',
  new1: '',
  new2: '',
})

const activeTab = ref('profile')

// Live hooks
onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab as string
  }
})
</script>
