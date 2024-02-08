<template>
  <div class="relative pt-[96px] px-[16px] sm:px-[48px] bg-brand-light-gray">
    <div
      class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray"
    />

    <h1 class="text-[32px] sm:text-[48px] font-medium relative">
      {{ $t('profile.title') }}
    </h1>

    <n-tabs v-model:value="activeTab" class="relative" type="line" animated>
      <n-tab-pane name="profile" :tab="$t('common.profileMenu.profile')">
        <div
          class="mt-[48px] grid grid-cols-1 sm:grid-cols-2 gap-[24px] bg-white rounded-[12px] p-[36px]"
        >
          <div>
            <div class="flex items-center gap-[16px]">
              <div
                class="bg-brand-light-gray rounded-[1000px] w-[96px] h-[96px]"
              />
              <div>
                <h2 class="text-[24px] font-medium">
                  {{
                    user?.user?.first_name
                      ? `${user.user.first_name} ${user.user.last_name}`
                      : $t('common.you')
                  }}
                </h2>
                <p class="text-gray-400">
                  {{ user?.user?.email || '' }}
                </p>
              </div>
            </div>
          </div>

          <form
            ref="userForm"
            class="flex flex-col gap-[12px]"
            @submit.prevent="user.updateUser(user.user)"
          >
            <div class="flex flex-col sm:flex-row gap-[12px]">
              <div class="flex flex-col gap-[8px]">
                <p class="font-medium">{{ $t('user.first_name') }}</p>
                <AppInput
                  v-model="user.user.first_name"
                  required
                  pattern=".{2,}"
                  :title="$t('user.nameRule')"
                  @blur="checkValidity"
                />
              </div>

              <div class="flex flex-col gap-[8px]">
                <p class="font-medium">{{ $t('user.last_name') }}</p>
                <AppInput
                  v-model="user.user.last_name"
                  required
                  pattern=".{2,}"
                  :title="$t('user.lastNameRule')"
                  @blur="checkValidity"
                />
              </div>
            </div>

            <div class="flex flex-col gap-[8px]">
              <p class="font-medium">{{ $t('common.info.mail') }}</p>
              <AppInput
                v-model="user.user.email"
                placeholder="example@example.com"
                type="email"
                required
                @blur="checkValidity"
              />
            </div>

            <div class="flex flex-col gap-[8px]">
              <p class="font-medium">{{ $t('common.info.phone') }}</p>
              <AppInput
                v-model="user.user.phone_number"
                :placeholder="$t('user.phone_number')"
                maska="+49 ### ###-##-##"
                type="tel"
                required
                @blur="checkValidity"
              />
            </div>

            <AppButton
              class="mt-[24px] w-full"
              type="submit"
              :disabled="!userForm?.checkValidity() ?? false"
            >
              {{ $t('common.actions.save') }}
            </AppButton>
          </form>
        </div>

        <div
          class="my-[24px] grid grid-cols-1 sm:grid-cols-2 gap-[24px] bg-white rounded-[12px] p-[36px]"
        >
          <h2 class="text-[24px] font-medium">
            {{ $t('common.actions.resetPassword') }}
          </h2>

          <form
            ref="passwordForm"
            class="flex flex-col gap-[12px]"
            @submit.prevent="changePassword"
          >
            <AppInput
              v-model="passwordChange.new_password1"
              :placeholder="$t('user.newPassword')"
              type="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              :title="$t('user.passwordValidation')"
              @blur="checkValidity"
            />
            <AppInput
              v-model="passwordChange.new_password2"
              :placeholder="$t('user.repeatPassword')"
              type="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              :title="$t('user.passwordValidation')"
              @blur="checkValidity"
            />
            <p v-if="passwordError" class="text-brand-red mt-2 mb-2">
              {{ passwordError }}
            </p>
            <p v-if="passwordChanged" class="text-brand-gray mt-2 mb-2">
              {{ passwordChanged }}
            </p>
            <AppButton
              type="submit"
              class="mt-[24px] w-full"
              :disabled="!passwordForm?.checkValidity() ?? false"
            >
              {{ $t('common.actions.change') }}
            </AppButton>
          </form>
        </div>
      </n-tab-pane>
      <n-tab-pane name="visitors" :tab="$t('common.profileMenu.children')">
        <div class="mt-[48px]" />
        <div
          class="bg-white flex flex-col justify-between gap-10 md:flex-row rounded-[12px] p-[36px] mb-[24px]"
        >
          <p>
            По всем возникшим вопросам обращайтесь по телефону или напиши на
            почту. Мы работаем
            <span class="text-brand-red">пн-пт c 9 до 18</span>
          </p>
          <div>
            <p class="text-brand-black font-medium">Телефон</p>
            <p class="text-brand-gray">+49 (0)30 71537477</p>
            <p class="text-brand-gray">+49 (0)30 71537477</p>
          </div>
          <div>
            <p class="text-brand-black font-medium">Почта</p>
            <p class="text-brand-gray">info@clavis-schule.de</p>
          </div>
        </div>
        <template v-for="visitor in user.visitorsOrders" :key="visitor.id">
          <div class="rounded-[12px] bg-white p-[36px] mb-[24px]">
            <div class="flex flex-col justify-between gap-6">
              <div class="flex items-center gap-[16px]">
                <div
                  class="bg-brand-dark-gray rounded-[1000px] w-[96px] h-[96px]"
                />
                <h2 class="text-[24px] font-medium">
                  {{
                    visitor?.first_name || visitor?.last_name
                      ? `${visitor.first_name} ${visitor.last_name}`
                      : ''
                  }}
                </h2>
              </div>

              <AppDivider class="my-[36px]" />

              <ProductsTable class="w-full" :orders="visitor.orders" with-button />
            </div>
          </div>
        </template>
      </n-tab-pane>
      <n-tab-pane name="workshops" :tab="$t('common.profileMenu.workshops')">
        <div
          class="flex flex-col gap-[12px] bg-white p-[36px] rounded-[12px] mt-[48px] mb-[24px]"
        >
          <div
            class="grid grid-cols-4 gap-[12px] font-medium p-[16px] min-w-[800px]"
          >
            <p>{{ $t('common.tableOptions.title') }}</p>
            <p>{{ $t('common.tableOptions.schedule') }}</p>
            <p>{{ $t('common.tableOptions.date') }}</p>
            <p>{{ $t('common.tableOptions.comment') }}</p>
          </div>

          <template
            v-if="user.workshops?.length && user.workshops?.length !== 0"
          >
            <div
              v-for="workshop in user.workshopOrders"
              :key="workshop.id"
              class="grid grid-cols-4 gap-[12px] bg-brand-light-gray p-[16px] min-w-[800px]"
            >
              <p>{{ workshop.product.name }}</p>
              <p />
              <p>{{ new Date().toDateString() }}</p>
              <p class="text-blue-500 cursor-pointer">
                {{ $t('common.actions.look') }}
              </p>
            </div>
          </template>

          <template v-else>
            <div class="px-[16px] bg-brand-light-gray py-[20px] rounded-[12px]">
              {{ $t('common.tableOptions.noActiveWorkshops') }}
            </div>
          </template>
        </div>
      </n-tab-pane>
      <n-tab-pane name="sales" :tab="$t('common.profileMenu.history')">
        <div class="bg-white p-[36px] rounded-[12px] mt-[48px] mb-[24px]">
          <ProductsTable :orders="user.orders" />
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui'
import { onMounted, ref, type VNodeRef } from 'vue'
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

// State
const passwordChange = ref({
  new_password1: '',
  new_password2: '',
})

const activeTab = ref('profile')

const userForm = ref<VNodeRef | undefined>(undefined)
const passwordForm = ref<VNodeRef | undefined>(undefined)

const passwordError = ref('')
const passwordChanged = ref('')

// Actions
const checkValidity = (event: { target: { reportValidity: () => void } }) => {
  event.target.reportValidity()
}

const changePassword = async () => {
  await user
    .changePassword(
      passwordChange.value.new_password1,
      passwordChange.value.new_password2,
    )
    .catch(err => {
      if (Object.keys(err).length !== 0) {
        passwordError.value = 'Кажется, что-то пошло не так'
        setTimeout(() => {
          passwordError.value = ''
        }, 3000)
      }
    })

  if (passwordError.value === '') {
    passwordChanged.value = 'Успешно изменено!'
    setTimeout(() => {
      passwordChanged.value = ''
      passwordError.value = ''
      passwordChange.value.new_password1 = ''
      passwordChange.value.new_password2 = ''
    }, 3000)
  }
}

// Live hooks
onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab as string
  }
})
</script>
<style>
.n-tabs.n-tabs--line-type .n-tabs-tab.n-tabs-tab--active,
.n-tabs.n-tabs--bar-type .n-tabs-tab.n-tabs-tab--active {
  color: #db3b4d !important;
}

.n-tabs .n-tabs-bar {
  background-color: #db3b4d !important;
}

.n-tabs.n-tabs--line-type .n-tabs-tab:hover,
.n-tabs.n-tabs--bar-type .n-tabs-tab:hover {
  color: #db3b4d !important;
}
</style>
